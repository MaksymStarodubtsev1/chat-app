const bcryptjs = require('bcryptjs')
const { User } = require('../../models')
const { UserInputError } = require(('apollo-server'))

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const user = await User.findAll()
        return user
      } catch(err) {
        console.log(err)
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