const bcryptjs = require('bcryptjs')
const { Message, User } = require('../../models')
const { UserInputError } = require(('apollo-server'))
const {AuthenticationError} = require("apollo-server");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/env.json')
const { Op } = require('sequelize')

const resolvers = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if(!user) throw new AuthenticationError('Unauthenticated')
        
        const users = await User.findAll({
          attributes: ['username', 'imageUrl', 'createdAt'],
          where: {
            username: {[Op.ne]: user.username},
        }})
        
        const allUserMessages = await Message.findAll({where: {
          [Op.or]: [{from: user.username}, {to: user.username}],
          },
          order: [['createdAt', 'DESC']]
        })

        const usersMessagesList = users.map((someUser) => {
          const latestMessage = allUserMessages.find(
            (message) => message.from === someUser.username || message.to === someUser.username)

          someUser.latestMessage = latestMessage
          return someUser
        })
        
        
        return usersMessagesList
      } catch(err) {
        console.log(err)
      }
    },
    login: async (_, args) => {
      const {username, password} = args
      const errors = {}
      
      try {
        if (username.trim() === '') errors.username = 'field must not be empty'
        if (password === '') errors.password = 'field must not be empty'
        if(Object.keys(errors).length > 0) throw new UserInputError('bad Input', {errors})
        
        const user = await User.findOne({where: { username }})
        if(!user) {
          errors.username = 'user not found'
          throw new UserInputError('user not found', { errors})
        }
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect) {
          errors.password = 'password is incorrect'
          throw new UserInputError('password is incorrect', { errors })
        }
        
        const token = jwt.sign({username}, JWT_SECRET, { expiresIn: 60 * 60 });
        
        user.token = token
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token
        }
      } catch(err) {
        console.log('err', err)
        throw err
      }
    },
    getUserChats: async (_, __, { user }) => {
      const userWithChart = await User.findOne({
        where: {username: user.username}
      })
      console.log('UserWithChart///', userWithChart.chats)

      return 'fwfwe'
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
        
        if(userByName || userByEmail) errors.username = 'this user has been taken'
        
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
    },
  }
};

module.exports = resolvers