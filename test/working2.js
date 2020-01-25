const {
    ApolloServer,
    gql,
  } = require('apollo-server');

const _ = require('lodash');

const author_list = [
    { id: 1, name: 'Tom', email: 'Coleman@gmail.com' },
    { id: 2, name: 'Sashko', email: 'Stubailo@gmail.com' },
    { id: 3, name: 'Mikhail', email: 'Novikov@gmail.com' },
  ];
  
  const follower_list = [
    { id :1 , authorId:1  , follower: [{authorId :2},{authorId :2}]  } ,
    {id :1 , authorId:2  , follower: [{authorId :3}] } ,
    {id :1 , authorId:3  , follower: [{authorId:1}] }
    ]


const typeDefs = gql`

type Author {
    id: Int!
    name: String
    email: String
    follower : [Author]
    following:[Author]
   
    
}

type Query {
   
    getAuthors : [Author]
    getAuthor(id : Int!) : Author 
    
  }

`;

const resolvers ={
     
    Query :{
        
        getAuthors : async () => Promise.resolve(author_list) ,
        getAuthor : async (_  , {id}) => Promise.resolve(author_list.find( p => p.id === id)) ,
  
  
           },

    Author: {
        },
    

};

const server = new ApolloServer({typeDefs , resolvers} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

