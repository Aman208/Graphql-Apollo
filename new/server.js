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
    { id: 1, authorId: 1, title: 'Introduction to GraphQL'},
    { id: 2, authorId: 2, title: 'Welcome to Meteor', },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', },
    { id: 4, authorId: 3, title: 'Launchpad is Cool',  },
  ];

  

  const comment_list = [
   { id :1 , authorId:1 , postId : 1 , text:'Comment One'  } ,
   { id :2 , authorId:1 , postId : 2 , text:'Comment Two'  } ,
   { id :3 , authorId:2 , postId : 3 , text:'Comment Three' } ,
   { id :4 , authorId:2 , postId : 4 , text:'Comment Four' } ,
   { id :5 , authorId:3,  postId : 4 , text:'Comment Five'  } ,

  ]

  //0 for No reaction
  //1 for like
  //2 for dislike

  const reaction_list = [
    { id :1 ,  authorId:1 , postId : 1 ,  reaction : 1 } ,
    { id :2, authorId:2 , postId : 1 ,  reaction : 1 } ,
    { id :3 , authorId:2 , postId : 3 ,  reaction : 0 } ,
    { id :4 ,authorId:2 , postId : 1 ,  reaction : 1} ,
    { id:5  ,  authorId:3,  postId : 4 ,  reaction : 2 } ,
 
   ]

   const follower_list = [
   { id :1 , authorId:1  , follower: [{authorId :2},{authorId :2}]  } ,
   {id :1 , authorId:2  , follower: [{authorId :3}] } ,
   {id :1 , authorId:3  , follower: [{authorId:1}] }
   ]



const typeDefs = gql`

type Author {
    id: ID!
    name: String
    email: String
    posts: [Post]
    myComment : [Comment]
    myLike : [Like]
    myDisLike: [DisLike]
}

  type Post {
    id: ID!
    title: String
    author: Author
    votes: Int
    comments:[Comment]
    like: [Like]
    disLike :[DisLike]
  }



 type Comment {
    id : ID!
    post: Post
    author : Author
    text : String 
 } 

 type Like {
   id: ID!
   post : Post
   author : Author
   reaction :Int
 }

 type DisLike {
  id: ID!
  post : Post
  author : Author
  reaction : Int
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

 input InputLike{
   authorId : Int!
   postId : Int!

 }

 input InputDisLike{ 
  authorId:Int!
  postId :Int!
 }

  type Query {
    getPosts : [Post]
    getAuthors : [Author]
    getPost(id : Int!) : Post
    getAuthor(id : Int!) : Author 
    getComments : [Comment] 
    getComment(id : Int!) : Comment
    getLikes : [Like]
    getDisLikes : [DisLike]
    getCommentByAuthor(authorId :Int!) : Comment
    getCommentByPost(postId :Int!) : Comment  
  }


  type Mutation {
    upvotePost (
      reaction : InputLike
    ): Post

    downvotePost (
       reaction : InputDisLike
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

const upvotePost = ({reaction}) => { return new Promise((res , reject) => {
let post = post_list.find( p => p.id === reaction.postId) ;
let author = author_list.find(p=> p.id ===reaction.authorId);
if(!post && !author)
{
    return reject("Could not find such Post or Author")
}
let react = reaction_list.find(p => p.authorId === reaction.authorId && p.postId === reaction.postId );
   react.reaction = 1;
 return res(post);

} )  
}

const downvotePost = ({reaction}) => { return new Promise((res , reject) => {
  let post = post_list.find( p => p.id === reaction.postId) ;
  let author = author_list.find(p=> p.id ===reaction.authorId);
  if(!post && !author)
  {
      return reject("Could not find such Post or Author")
  }
  let react = reaction_list.find(p => p.authorId === reaction.authorId && p.postId === reaction.postId );
     react.reaction = 2;
     
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

      getLikes : async () => Promise.resolve(reaction_list.filter(p => p.reaction === 1)) ,
      getDisLikes : async () => Promise.resolve(reaction_list.filter(p => p.reaction === 2)),

         },

    Mutation :{
     
        upvotePost :  async ( _ , {reaction}) => await upvotePost({reaction}) ,
        downvotePost : async (_ , {reaction}) => await downvotePost({reaction}) ,
        addPost  : async(_ , {post}) => await addPost({post}) ,
        addAuthor : async ( _ , {author}) => await addAuthor({author})
    } ,

 
      Author: {
        posts: author => _.filter(post_list, { authorId: author.id }),
        myComment : author => _.filter(comment_list ,{authorId : author.id}) ,
        myLike : author => _.filter(reaction_list ,{'authorId' : author.id , 'reaction' : 1 } ),
        myDisLike :  author => _.filter(reaction_list ,{'authorId' : author.id , 'reaction' : 2 } ),
      },
      //author here is like this.author in "type Author"
    
      Post: {
        author: post => _.find(author_list, { id: post.authorId }),
        comments : post => _.filter(comment_list ,{postId : post.id}),
        like :  post => _.filter(reaction_list ,{ 'postId' : post.id , 'reaction' : 1 } ) ,
        disLike :  post => _.filter(reaction_list ,{ 'postId'  : post.id , 'reaction' : 2 } ) ,
        votes : post => _.size( _.filter(reaction_list , { 'postId'  : post.id ,'reaction' : 1})) - _.size( _.filter(reaction_list , { 'postId'  : post.id , 'reaction' : 2})) ,
      },


      //post here is like this.post in "type Post"

      Comment :{
       post : comment => _.find(post_list , { id : comment.postId}) ,
       author: comment => _.find(author_list , { id : comment.authorId})

      } ,

      Like :{
        post : l => _.find(post_list , { id : l.postId}) ,
        author: l => _.find(author_list , { id : l.authorId}) ,
      
       } ,

       DisLike : {
        post : d => _.find(post_list , { id : d.postId}) ,
        author: d => _.find(author_list , { id : d.authorId}) ,
     
       }
        
    

};

const server = new ApolloServer({typeDefs , resolvers} );

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });


  // https://www.howtographql.com/react-apollo/5-authentication/

  // https://levelup.gitconnected.com/what-is-graphql-87fc7687b042