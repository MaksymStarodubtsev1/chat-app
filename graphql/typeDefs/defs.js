const {gql} = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  
  type Query {
    getUsers: [User]!
  }
  
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;

module.exports = typeDefs