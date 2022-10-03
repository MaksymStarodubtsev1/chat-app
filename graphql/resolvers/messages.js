const { Message, User } = require('../../models')
const { UserInputError } = require(('apollo-server'))
const {AuthenticationError} = require("apollo-server");
const {Op} = require("sequelize");


const resolvers = {
  Query: {
    getMessages: async (parent, {from}, {user}) => {
      try {
        if(!user) throw AuthenticationError('Unauthenticated')
        
        const recepient = await User.findOne({where: {username: from}})
        if(!recepient) throw AuthenticationError('User not found')
        
        const users = [user.username, recepient.username]
        
        const messages = await Message.findAll({
          where: {
            from: {[Op.in]: users},
            to: {[Op.in]: users}
          },
          order: [['createdAt', 'DESC']]
        })
        
        return messages
        
      } catch(err) {
        console.log(err)
      }
      
    }
  },
  Mutation: {
    sendMessage: async(_, {to, content}, {user}) => {
      try {
        if(!user) throw new AuthenticationError('Unauthenticated')
        
        const recipient = await User.findOne({where: {username: to}})
        
        if(!recipient) throw new UserInputError('User not found')
        else if(recipient.username === user.username) throw new UserInputError("User can't message yourself")
        if(content.trim() === '') throw new AuthenticationError('Message need to be not empty')
        
        const message = Message.create({
          from: user.username,
          to,
          content
        })
        
        return message
        
        
      } catch(err) {
        console.log(err)
        throw err
      }
    }
  }
};

module.exports = resolvers