const userResolvers = require('../resolvers/users')
const messageResolvers = require('../resolvers/messages')

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString()
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation
  },
  Subscription: {
    ...messageResolvers.Subscription
  }
}