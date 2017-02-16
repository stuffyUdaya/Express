var mongoose = require('mongoose')
var reg = new RegExp( ".js$", "i" )
var dbURI = 'mongodb://localhost/discussion_board';
mongoose.connect( dbURI );
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});
/* this bit of code reads all the files in the path for 'models_path' Use it if you want!*/
// fs.readdirSync( models_path ).forEach( function( file ) {
//   if( reg.test( file ) ) {
//     require( path.join( models_path, file ) );
//   }
// });
var UserSchema = new mongoose.Schema({
  name: String
},{timestamps:true})
var TopicSchema = new mongoose.Schema({
  _user: {type:String, ref:'User'},
  question: String,
  description: String,
  _category: {type: String, ref:'Category'},
  answers: [{type: String, ref:'Answer'}]
},{timestamps:true})
var AnswerSchema = new mongoose.Schema({
  _topic: {type: String, ref:'Topic'},
  _user: {type: String, ref:'User'},
  answer: String,
  upvotes: {type:Number, default:0},
  downvotes: {type:Number, default:0},
  comments: [{type:String, ref:'Comment'}]
},{timestamps:true})
mongoose.model('Answer', AnswerSchema);
mongoose.model('Topic', TopicSchema);
mongoose.model('User', UserSchema);

var User = mongoose.model('User')
User.create({name:"Minh"})
User.create({name:"Marco"})
User.create({name:"Will"})
User.create({name:"Tim"})
User.create({name:"Dan"})
console.log("========created users============")
user = User.findOne({})

var Topic = mongoose.model('Topic')
Topic.create({question:"What is modularization?", description:"this is so weird", _user:user._id})
Topic.create({question:"What is life?", description:"Ball is life?", _user:user._id})
Topic.create({question:"Why must we code so much?", description:"Code is life?", _user:user._id})
Topic.create({question:"This insert script is interesting", description:"Indeed", _user:user._id})
console.log("========created topics============")
var Answer = mongoose.model('Answer')

Answer.create({answer:"I never have the right answers"})
.then(function(){
Answer.create({answer:"I cant give you the answer"})
}).then(function(){
Answer.create({answer:"what have you tried?"})
}).then(function(){
Answer.create({answer:"Why do you think that is happening?"})
}).then(function(){
Answer.find({}, function(err,answers){
	Topic.find({}, function(err, topics){
		answers.forEach(function(answer){
			var random = Math.floor(Math.random()*4)
			answer._topic = topics[random]._id
			answer.save()
			topics[random].answers.push(answer._id)
			topics[random].save()
		})
	})
})
})