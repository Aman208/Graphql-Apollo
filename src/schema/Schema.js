const { gql } = require('apollo-server-express')

const typeDefs = gql`

type User {
     _id: ID!
    name: String
    email: String
    posts: [Post]
    myComment : [Comment]
    myLike : [Reaction]
    myDislike: [Reaction]
}

  type Post {
     _id: ID!
    title: String
    user: User
    votes: Int
    comments:[Comment]
    likes: [Reaction]
    dislikes :[Reaction]
  }



 type Comment {
     _id: ID!
    post: Post
    user : User
    text : String 
 } 

 type Reaction {
    _id: ID!
   post : Post
   user : User
   kind :Int
 }



 input InputComment{
     postId:String!
     userId : String!
     text:String
 }

 input InputPost{
     userId:String! ,
     title:String ,
 }

 input SignUp{
    name:  String 
    email : String!
    password : String!
 }

 input Login{
  email : String!
  password : String!
 }

 input InputReaction{
   userId : String!
   postId : String!
   kind : Int
 }



  type Query {
    getPosts : [Post]
    getUsers : [User]
    getPost(id : String!) : Post
    getUser(id : String!) : User 
    getComments : [Comment] 
    getComment(id : String!) : Comment
    getLikes : [Reaction]
    getDisLikes : [Reaction]
    getCommentByUser(userId :String!) : Comment
    getCommentByPost(postId :String!) : Comment  
  }


  type Mutation {
    reactPost (
      reaction : InputReaction
    ): Post

  

    addPost( post : InputPost ) : Post
    signup(user : SignUp) : String
    login (user :Login) : String

  }


`;

module.exports = typeDefs ;
