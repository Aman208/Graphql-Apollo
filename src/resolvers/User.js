
const {promisify} = require('../helpers');
const Reaction  = require('../models/Reaction');
const Post  = require('../models/Post');
const User  = require('../models/User');
const Comment  = require('../models/Comment');

const resolvers = {
  posts: (user, args) => promisify(Post.find({_id: user._id}) ) ,
  myComment : (user) => promisify(Comment.find({_id: user._id })) ,
  myLike :(user) => promisify(Reaction.find({_id: user._id ,  reaction : 1})),
  myDislike :(user) => promisify(Reaction.find({_id: user._id ,  reaction : 2})),
};

module.exports = resolvers;