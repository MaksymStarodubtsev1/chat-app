const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models')

const typeDefs = require('./graphql/typeDefs/defs');
const resolvers = require('./graphql/resolvers/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  
  sequelize.authenticate().then(() => console.log('Database connected'))
});