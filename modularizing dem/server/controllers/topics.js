var mongoose = require('mongoose');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Topic = mongoose.model('Topic');





function TopicsController(){
  this.index = function(req,res){
    Topic.find({}).populate('_user').exec(function(err, topics){
      res.json({topics:topics, err:err});
    })
  };
  this.create = function(req,res){
    var topic = new Topic(req.body)
    console.log(req.body)
    topic.save(function(err, topic){
      topic.populate('_user answers').execPopulate().then(function(topic){
        console.log(topic)
        res.json({topic:topic, err:err});
      })
    })
  };
  this.update = function(req,res){
    Topic.update({_id:req.params.id}, {$set:req.body}, function(err, topic){
      console.log(err)
      console.log(topic)
      res.json({topic:topic, err:err});
    })
  };
  this.delete = function(req,res){
    Topic.remove({_id:req.params.id}, function(err){
      res.json({err:err})
    })
  };
  this.show = function(req,res){
    Topic.findOne({_id:req.params.id},function(err, topic){
      Topic.populate(topic, [
        {path:'_user'},
        {path:'answers',
          populate:[
            {path:'_user'}
          ]
        }
        ], function(err, topic){
        console.log(topic)
        res.json({topic:topic, err:err});
      })
    })
  };
}
module.exports = new TopicsController();
