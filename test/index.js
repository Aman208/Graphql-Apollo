const {
    ApolloServer,
    gql,
  } = require('apollo-server');

const movies_list = [
    {
        title:"Terminator 2" ,
        director:"James Cameron" ,
        actors : [{name :"Arnold "}]
    } ,
    {
        title:"Krissh 3" ,
        director:"Mahesh Buttt" ,
        actors : [{name :"Hritik"}]
    } ,

];

const books_list = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    }
  ];





const typeDefs = gql`

# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Movie {
     title : String 
     director : String 
     actors : [Actor]
    }
    
    type Actor{
        name : String
    }

    type Query{
        movies : [Movie]
        books : [Book]
    } 

    type Book {
        title: String
        author: String
      }
    
    

`;

const resolvers ={
    Query :{
        movies :() => movies_list   ,
        books : () => books_list
    },
        
    

};

const server = new ApolloServer({typeDefs , resolvers} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });





module.exports = typeDefs;