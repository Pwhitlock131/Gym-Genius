const typeDefs = `
scalar Date
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    name: String!
    age: Int!
    height: Int!
    weightGoal: Int!
    workouts: [Workout]
  }
type: Workout{
    _id: ID
    name:String!
    duration:Int!
    createdAt: Date
    type: String!
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, name:String!, age: Int!, height: Int!, weightGoal:Int!): Auth
    login(email: String!, password: String!): Auth

    addWorkout(name: String!, duration: Int!, type: String!): User
    removeWorkout(workoutID:ID!): User
  }
`;

module.exports = typeDefs;
