var mongoose= require('mongoose');
var Schema = mongoose.Schema
var UserSchema = new mongoose.Schema({
  name: String
},{timestamps:true})


mongoose.model('User', UserSchema);
