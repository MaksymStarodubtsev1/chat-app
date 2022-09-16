const bcryptjs = require('bcryptjs')
const { User } = require('../../models')
const { UserInputError } = require(('apollo-server'))
const {AuthenticationError} = require("apollo-server");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/env.json')

const resolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        let user

        if(context.req && context.req.headers.authorization) {
          const token = context.req.headers.authorization
          console.log(token)
          jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) throw new AuthenticationError('bad credentials')

            user = decodedToken
          })
        }
        
        const users = await User.findAll()
        
        return users
      } catch(err) {
        console.log(err)
      }
    },
    login: async (_, args) => {
      const {username, password} = args
      const errors = {}
      
      try {
        if (username.trim() === '' || password === '') {
          errors.username = 'fields must not be empty'
        }
        if(Object.keys(errors).length > 0) {
          throw new UserInputError('bad Input', {errors})
        }
        
        const user = await User.findOne({where: { username }})
        
        if(!user) {
          errors.username = 'user not found'
          throw new UserInputError('user not found', { errors})
        }
        
        const correctPassword = await bcryptjs.compare(password, user.password)
        
        if(!correctPassword) {
          errors.password = 'password is incorrect'
          throw new AuthenticationError('password is incorrect', { errors })
        }
        
        const token = jwt.sign({
          username
        }, JWT_SECRET, { expiresIn: 60 * 60 });
        
        
        user.token = token
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token
        }
      } catch(err) {
        console.log('err', err)
      }
    }
  },
  Mutation: {
    register: async (_, args) => {
      const {username, email, password, confirmPassword} = args
      const errors = {}
      
      if(username === '') errors.username = 'username is required'
      if(email === '') errors.email = 'email is required'
      if(password === '') errors.password = 'password is required'
      if(confirmPassword === '') errors.confirmPassword = 'confirmPassword is required'
      
      if(confirmPassword !== password) errors.confirmPassword = 'passwords must match'
      
      try {
        const userByName = await User.findOne({where: { username }})
        const userByEmail = await User.findOne({where: { email }})
        
        if(userByName || userByEmail) errors.userHasTaken = 'this user has been taken'
        
        if(Object.keys(errors).length > 0) throw errors
        
      const hashPassword = await bcryptjs.hash(password, 6)
      
      const user = await User.create({
        username,
        email,
        password: hashPassword
      })
      
      return await user
      } catch(err) {
        throw new UserInputError('Bad input', { errors: err})
      }
    }
  }
};

module.exports = resolvers