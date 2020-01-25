const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text:  {
    type : String ,
    require:true 
  } ,
  userId:  {
    type :Schema.Types.ObjectId,
    require:true 
  } ,
  postId:  {
    type :Schema.Types.ObjectId,
    require:true 
  } ,
  createdAt: {
      type: Date, 
      default: Date.now
    },

});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment};
