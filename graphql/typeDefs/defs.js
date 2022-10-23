const {gql} = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
    imageUrl: String
    createdAt: String!
    chats: String
    requests: String
    token: String
    latestMessage: Message
  }
  
  type Message {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
  }
  
  type Query {
    getUsers(getAll: Boolean): [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }
  
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    sendMessage(to: String!, content: String!): Message!
    addNewUserChat(username: String!): [String]!
    addNewRequest(username: String!): [String]!
  }
  
  type Subscription {
    newMessage: Message!
  }
`;

module.exports = typeDefs