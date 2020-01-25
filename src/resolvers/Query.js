
const Reaction  = require('../models/Reaction');
const Post  = require('../models/Post');
const User  = require('../models/User');
const Comment  = require('../models/Comment');


const {promisify} = require('../helpers');

const resolvers = {
  getPosts: () => promisify(Post.find({}).sort('-createdAt')),
  getUsers: () => promisify(User.find({})),
  getPost: ( _, {id}) => promisify(Post.findById(id)),
  getUser : (_ ,{id}) => promisify(User.findById(id)),
  getComments : () => promisify(Comment.find({})),
};

module.exports = resolvers;