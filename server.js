const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models')

const typeDefs = require('./graphql/typeDefs/defs');
const resolvers = require('./graphql/resolvers');
const contextMiddleware = require('./util/contextMiddleware');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  
  sequelize.authenticate().then(() => console.log('Database connected'))
});