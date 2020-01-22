const {
    ApolloServer,
    gql,
  } = require('apollo-server');


  const books_list = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: { name : 'J.K. Rowling'}
    },
    {
      title: 'Jurassic Park',
      author: {name : 'Michael Crichton'},
    }
  ];


  const typeDefs = gql`

# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.


type Book {
    title: String
    author: Author
  }


type Author {
    name: String
    books: [Book]
  }
  
  type Query{
        getBooks : [Book]
        getAuthors: [Author]
        
    } 

`;

const resolvers ={
    Query :{
        getBooks : () => books_list
        
    },

};


const server = new ApolloServer({typeDefs , resolvers} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });





module.exports = typeDefs;
