const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const {
    ApolloServer,
    gql
  } = require('apollo-server');


const typeDefs = gql`
scalar ISODate

type User {
    name : String 
    bio : String
}
type Vote {
    votedby : User
}

type Question {
    
}

type Post {
    _id: ID!
    content: String
    createdAt: ISODate
    author: User
    votes: [Vote]
    voteCount: Int
    question: Question
    isQuestion: Boolean
  }
`

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});