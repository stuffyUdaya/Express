var mongoose= require('mongoose');
var TopicSchema = new mongoose.Schema({
  _user: {type:String, ref:'User'},
  question: String,
  description: String,
  _category: {type: String, ref:'Category'},
  answers: [{type: String, ref:'Answer'}]
},{timestamps:true})
var Topic = mongoose.model('Topic', TopicSchema);
