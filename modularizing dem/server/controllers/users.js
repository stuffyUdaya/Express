
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');



function UsersController(){
  this.create = function(req, res){
    User.findOne({username:req.body.username}, function(err, user){
      if(user){
        res.json({err: null, user:user})
      }else{
        var user = new User(req.body)
        user.save(function(err, user){
          res.json({err:err, user:user})
        })
      }
    })
  }
  this.show = function(req, res){
    User.findOne({_id:req.params.id}, function(err, user){
      Topic.find({_user:user._id}, function(err,topics){
        Answer.find({_user:user._id}, function(err, answers){
          res.json(
            {
              topics_count:topics.length,
              answers_count:answers.length,
              user:user
            }
          )
        })
      })
    })
  }
}


module.exports = new UsersController();
