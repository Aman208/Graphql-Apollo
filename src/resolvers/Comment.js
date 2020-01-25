
const {promisify} = require('../helpers');
const Reaction  = require('../models/Reaction');
const Post  = require('../models/Post');
const User  = require('../models/User');
const Comment  = require('../models/Comment');

const resolvers = {
  user: comment => promisify(User.findById(comment.userId) ),
  post : comment => promisify(Post.findById(comment.postId) ), 

};

module.exports = resolvers;