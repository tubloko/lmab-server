module.exports = `
  type PublicUser {
    id: String
    nickname: String
    firstName: String
    lastName: String
    email: String
    challengeRoomsIds: [String]
  }
  type User {
    id: String
    name: String
    email: String
    googleId: String
    token: String
    challengeRoomsIds: [String]
  }
  type AuthPayload {
    user: User
  }
  type Query {
    getUser: AuthPayload
    getListUsers: [PublicUser]
  }
  type Logout {
    success: Boolean
  }
  type Mutation {
    login(email: String! password: String!): AuthPayload
    signUpWithGoogle(name: String! email: String! password: String! accessToken: String!): AuthPayload
    register(name: String! email: String! password: String! googleId: String): AuthPayload
    onSubscribe(id: ID! challengeRoomIds: [String] challengeRoomId: String!): AuthPayload
    logout: Logout
  }
`;
