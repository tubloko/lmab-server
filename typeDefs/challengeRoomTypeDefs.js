module.exports = `
  input InputMessage {
    userId: String!
    from: String!
    message: String!
  }
  type Message {
    id: ID!
    userId: String!
    from: String!
    message: String!
  }
  type ChallengeRoom {
    id: ID!
    description: String!
    title: String!
    author: String!
    userId: String!
    messages: [Message]
  }
  type Query {
    listChallengeRooms: [ChallengeRoom]
    challengeRoom(id: ID!): ChallengeRoom
  }
  type Mutation {
    createChallengeRoom(title: String! description: String! author: String! userId: String!): ChallengeRoom
    updateChallengeRoom(id: ID! message: InputMessage!): ChallengeRoom
  }
  type Subscription {
    messageSent: ChallengeRoom
  }
`;
