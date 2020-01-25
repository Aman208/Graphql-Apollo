
const {promisify} = require('../helpers');
const Reaction  = require('../models/Reaction');
const Post  = require('../models/Post');
const User  = require('../models/User');
const Comment  = require('../models/Comment');

const resolvers = {
  user: post => promisify(User.findById(post.userId)),
  comments : post => promisify(Comment.find({postId : post._id })), 
  likes :  post =>   promisify(Reaction.find({postId : post._id , kind :1 })), 
  dislikes :  post =>   promisify(Reaction.find({postId : post._id , kind :2 })),
  votes : post =>  promisify(Reaction.find({postId : post._id , kind :1 })) - promisify(Reaction.find({postId : post._id , kind :2 })),
};

module.exports = resolvers;



// author : post => new Promise((res , rej) => {


// Todo.find({_creater : req.user._id }).then((todos) => {
//   res.send({todos});
// }, (e) => {
//   rej.status(400).send(e);
// });

// }

// ) 