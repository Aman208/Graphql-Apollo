
const {promisify} = require('../helpers');
const Reaction  = require('../models/Reaction');
const Post  = require('../models/Post');
const User  = require('../models/User');
const Comment  = require('../models/Comment');

const resolvers = {
  user: r => promisify(User.findById(r.userId )),
  post : r => promisify(Post.findById(r.postId )), 

};

module.exports = resolvers;