const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  kind:  {
    type : Number,
    require:true ,
    default :0
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

var Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = {Reaction};


