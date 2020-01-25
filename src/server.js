
const mongoose = require('mongoose');
const express = require('express')
const { ApolloServer , graphiqlExpress, graphqlExpress} = require('apollo-server-express')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const typeDefs = require('./schema/Schema');
const cors = require('cors');
const bodyParser = require('body-parser');

 const Query  = require('./resolvers/Query');
 const Reaction  = require('./resolvers/Reaction');
 const Post  = require('./resolvers/Post');
 const User  = require('./resolvers/User');
 const Comment  = require('./resolvers/Comment');
 const Mutation  = require('./resolvers/Mutation');

const port = 4000
const path = '/api'
const app = express()

const resolvers = {Query,  Reaction, Post, User, Comment};

mongoose.connect( 'mongodb://localhost:27017/gqlData' , {useNewUrlParser : true ,useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false
   } ).then(con=>{
      console.log('Databse connected successfully');
      
  }).catch ( err => console.log(err));

app.use(cors);
// app.use(bodyParser.json());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
   let token = null ;
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
         console.log(req.headers.authorization.split(' ')[1]);
          token = req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        token = req.query.token;
      }
     
    

    var user = jwt.verify(token,  process.env.JWT_SECRET);
    console.log(user);
   


    return {user};
  }
})

server.applyMiddleware({ app, path })

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)




  
  
  
