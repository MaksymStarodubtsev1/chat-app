
const { User } = require('../../models')

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
};

module.exports = resolvers