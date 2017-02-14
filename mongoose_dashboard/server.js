// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var RabbitSchema = new mongoose.Schema({
 name: String

})

mongoose.model('Rabbit', RabbitSchema); // We are setting this Schema in our Models as 'User'
var Rabbit = mongoose.model('Rabbit') // We are retrieving this Schema from our Models, named 'User'
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

//Show all
app.get('/', function(req, res) {

  Rabbit.find({},function(err,rabbits){
    if(err) {
      console.log('something went wrong');
    }
    else{
    res.render('index',{rabbits:rabbits})
  }
  });
})

    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.

// Adding a new rabbit


app.get('/mongooses/new',function(req,res){
  res.render('new');
});

// show a particular rabbit

app.get('/mongooses/:id',function(req,res){
  console.log('hi');
  // console.log(id);
  Rabbit.find({_id:req.params.id},function(err,rabbits){
    if(err) {
      console.log('something went wrong');
    }
    else{
    res.render('show',{rabbits:rabbits})
  }
});
})


// Editing a rabbit

app.get('/mongooses/edit/:id',function(req,res){
  var id = req.params.id;
  Rabbit.find({_id:req.params.id},function(err,rabbits){
    if(err) {
      console.log('something went wrong');
    }
    else{
    res.render('edit',{id:id});
  }

});
})

// updating a rabbit


app.post('/mongooses/:id',function(req,res){

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

});

// Deleting a rabbit

  app.post('/mongooses/delete/:id',function(req,res){
    console.log(req.params.id);
    Rabbit.findById(req.params.id).remove(function(err){
      if(err){
        console.log("some thing wrong",+err);
      }
      res.redirect('/');
    })



  })

// Add User Request


// updating databse with new user


app.post('/mongooses', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
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
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
