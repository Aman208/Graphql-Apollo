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
  
  const post_list = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
  ];

  const comment_list = [
   { id :1 , authorId:1 , postId : 1 , text:'Comment One' } ,
   { id :2 , authorId:1 , postId : 2 , text:'Comment Two' } ,
   { id :3 , authorId:2 , postId : 3 , text:'Comment Three' } ,
   { id :4 , authorId:2 , postId : 4 , text:'Comment Four' } ,
   { id :5 , authorId:3,  postId : 4 , text:'Comment Five' } ,

  ]

const typeDefs = gql`

type Author {
    id: Int!
    name: String
    email: String
    posts: [Post]
    myComment : [Comment]
}

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
    comments:[Comment]
  }

 type Comment {
    id : Int!
    post: Post
    author : Author
    text : String 
 } 

 input InputComment{
     postId:Int!
     authorId : Int!
     text:String
 }

 input InputPost{
     authorId:Int! ,
     title:String ,
 }

 input InputAuthor{
    name:  String 
    email : String
 }

  type Query {
    getPosts : [Post]
    getAuthors : [Author]
    getPost(id : Int!) : Post
    getAuthor(id : Int!) : Author 
    getComments : [Comment] 
    getComment(id : Int!) : Comment

    getCommentByAuthor(authorId :Int!) : Comment
    getCommentByPost(postId :Int!) : Comment
  
  }


  type Mutation {
    upvotePost (
      postId: Int!
    ): Post

    downvotePost (
        postId: Int!
      ): Post

    addPost( post : InputPost ) : Post
    addAuthor(author : InputAuthor) : Author

  }


`;

const addPost = ({post}) => {
  return new Promise((result , reject) => {

    const newId = post_list.length === 0 ? 1: post_list[post_list.length-1].id + 1;
    let votes = 0 ;
 
    post_list.push({ votes:votes , id: newId , title : post.title , authorId : post.authorId   });

      return result(post_list.find(p => p.id === newId));
  })
}

const addAuthor = ({author}) => {
  return new Promise((result , reject) => {

    const newId = author_list.length === 0 ? 1: author_list[author_list.length-1].id + 1;
 
    author_list.push({  id: newId , name: author.name , email : author.email   });

      return result(author_list.find(p => p.id === newId));
  })
}

const upvotePost = ({postId}) => { return new Promise((res , reject) => {
let post = post_list.find( p => p.id === postId) ;
if(!post)
{
    return reject("Could not find such Post")
}
post.votes +=1;
 return res(post);

} )  
}

const downvotePost = ({postId}) => { return new Promise((res , reject) => {
    let post = post_list.find( p => p.id === postId) ;
    if(!post)
    {
        return reject("Could not find such Post")
    }
    post.votes -=1;
     return res(post);
    
    } )  
    }

const resolvers ={
    Query :{
      getPosts : async () => Promise.resolve(post_list)  ,
      getAuthors : async () => Promise.resolve(author_list) ,
      getPost : async (_  ,{id}) =>  Promise.resolve(post_list.find( p => p.id === id)),
      getAuthor : async (_  , {id}) => Promise.resolve(author_list.find( p => p.id === id)) ,

      getComments  : async ()  => Promise.resolve(comment_list) ,
      getComment : async (_  , {id}) => Promise.resolve(comment_list.find( p => p.id === id)) ,

    },

    Mutation :{
     
        upvotePost :  async ( _ , {postId}) => await upvotePost({postId}) ,
        downvotePost : async (_ , {postId}) => await downvotePost({postId}) ,
        addPost  : async(_ , {post}) => await addPost({post}) ,
        addAuthor : async ( _ , {author}) => await addAuthor({author})
    } ,

 
      Author: {
        posts: author => _.filter(post_list, { authorId: author.id }),
        myComment : author => _.filter(comment_list ,{authorId : author.id}) ,
      },
      //author here is like this.author in "type Author"
    
      Post: {
        author: post => _.find(author_list, { id: post.authorId }),
        comments : post => _.filter(comment_list ,{postId : post.id}),
      },

      //post here is like this.post in "type Post"

      Comment :{
       post : comment => _.find(post_list , { id : comment.postId}) ,
       author: comment => _.find(author_list , { id : comment.authorId})

      }
        
    

};

const server = new ApolloServer({typeDefs , resolvers} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

