const { Message, User } = require('../../models');
const { UserInputError, AuthenticationError, withFilter } = require('apollo-server');
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
    sendMessage: async(_, {to, content}, {user, pubsub}) => {
      try {
        if(!user) throw new AuthenticationError('Unauthenticated')
        
        const recipient = await User.findOne({where: {username: to}})
        
        if(!recipient) throw new UserInputError('User not found')
        else if(recipient.username === user.username) throw new UserInputError("User can't message yourself")
        if(content.trim() === '') throw new AuthenticationError('Message need to be not empty')
        
        const message = await Message.create({
          from: user.username,
          to,
          content
        })
        
        pubsub.publish('NEW_MESSAGE', { newMessage: message })
        
        return message
        
        
      } catch(err) {
        console.log(err)
        throw err
      }
    }
  },
  Subscription: {
    newMessage: {
     subscribe: withFilter(
       (_, __, { pubsub, user }) => {
         if(!user) throw new AuthenticationError('Unauthenticated')
         return pubsub.asyncIterator('NEW_MESSAGE')
       }, ({newMessage}, _, {user}) => {
         if (newMessage.to === user.username || newMessage.from === user.username) {
           return true
         }
         return false
       }
     ),
    }
  }
};

module.exports = resolvers