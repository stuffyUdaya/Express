


var mongoose = require('mongoose');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');


function AnswersController(){
  this.index = function(req, res){
    Answer.find({}, function(err, answers){
      res.json({answers:answers, err:err})
    })
  }
  this.create = function(req,res){
    Topic.findOne({_id:req.body._topic}, function(err, topic){
      var answer = new Answer(req.body)
      answer.save(function(err, answer){
        topic.answers.push(answer._id)
        topic.save(function(err, topic){
          Topic.populate(topic, [
            { path: '_user'},
            {
              path: 'answers',
              populate:[
                {path:'_user'}
              ]
            }
            ], function(err, topic){
            res.json({topic:topic, err:err})
          })
        })
      })
    })
  };
  this.update = function(req, res){
    if(req.body.direction !== undefined){
      Answer.findOne({_id:req.params.id}, function(err, answer){
        if(req.body.direction){
          answer.upvotes += 1;
        }else{
          answer.downvotes +=1
        }
        answer.save(function(err, answer){
          res.json(answer)
        })
      })
    }
  }
}
module.exports = new AnswersController();
