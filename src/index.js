
const mongoose = require('mongoose');

const {
  ApolloServer,
  gql,
} = require('apollo-server');

const  schema  =  require('./schema/schemaMain'); 



mongoose.connect( 'mongodb://localhost:27017/gqlData' , {useNewUrlParser : true ,useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false
   } ).then(con=>{
      console.log('Databse connected successfully');
      
  }).catch ( err => console.log(err));

  const server = new ApolloServer({schema} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
  
  
  
