var mongoose= require('mongoose');
var AnswerSchema = new mongoose.Schema({
  _topic: {type: String, ref:'Topic'},
  _user: {type: String, ref:'User'},
  answer: String,
  upvotes: {type:Number, default:0},
  downvotes: {type:Number, default:0},
  comments: [{type:String, ref:'Comment'}]
},{timestamps:true})
mongoose.model('Answer', AnswerSchema);
