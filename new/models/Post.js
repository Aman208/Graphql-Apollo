const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type :String ,
    require : true 
  },
 userId: {type :Schema.Types.ObjectId,
    require:true 
  } ,
  createdAt: {type: Date, default: Date.now},

});

var Post = mongoose.model('Post', postSchema);

module.exports = {Post};