var mongoose = require('mongoose');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');

module.exports = function(){
  return {
    users: new UsersController(),
    topics: new TopicsController(),
    answers: new AnswersController(),
  }
}
