var mongoose = require('mongoose');
var Rabbit = mongoose.model('Rabbit')
module.exports = {
showall: function(req,res){
          Rabbit.find({},function(err,rabbits){
            if(err) {
              console.log('something went wrong');
            }
            else{
            res.render('index',{rabbits:rabbits})
          }
          });
        },

showone: function(req,res){

          Rabbit.find({_id:req.params.id},function(err,rabbits){
            if(err) {
              console.log('something went wrong');
            }
            else{
            res.render('show',{rabbits:rabbits})
          }
        });

},

edit: function(req,res){

            var id = req.params.id;
            Rabbit.find({_id:req.params.id},function(err,rabbits){
              if(err) {
                console.log('something went wrong');
              }
              else{
              res.render('edit',{id:id});
            }

          });
},
update: function(req,res){

              Rabbit.findById(req.params.id,function(err,rabbit){
                if (err){
                  console.log("something went wrong", err);
                }
                else{
                  console.log(req.params.id)
                  rabbit.name = req.body.name
                  rabbit.save()
                  res.redirect('/');
                }
              });
},

delete:  function(req,res){

              Rabbit.findById(req.params.id).remove(function(err){
                if(err){
                  console.log("some thing wrong",+err);
                }
                res.redirect('/');
              })

},

add:   function(req,res){

            var rabbit = new Rabbit({name: req.body.name});
            // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
            rabbit.save(function(err) {
              // if there is an error console.log that something went wrong!
              if(err) {
                console.log('something went wrong');
              } else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added a rabbit!');
                res.redirect('/');
              }
            })
}

        }
