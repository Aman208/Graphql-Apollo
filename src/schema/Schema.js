const typeDefs = gql`

type Author {
    id: Int!
    name: String
    email: String
    posts: [Post]
    myComment : [Comment]
    myLike : [Like]
    myDisLike: [DisLike]
}

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
    comments:[Comment]
    like: [Like]
    disLike :[DisLike]
  }



 type Comment {
    id : Int!
    post: Post
    author : Author
    text : String 
 } 

 type Like {
   id: Int!
   post : Post
   author : Author
   reaction :Int
 }

 type DisLike {
  id: Int!
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
