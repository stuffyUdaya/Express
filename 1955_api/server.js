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
mongoose.connect('mongodb://localhost/basic_api');
var PeopleSchema = new mongoose.Schema({
 name: String

})

mongoose.model('People', PeopleSchema); // We are setting this Schema in our Models as 'User'
var People = mongoose.model('People') // We are retrieving this Schema from our Models, named 'User'
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
app.use(bodyParser.json());
// Routes
// Root Request

//Show all
app.get('/', function(req, res) {

  People.find({},function(err,peoples){
    if(err) {
      console.log('something went wrong');
    }
    else{
      console.log(peoples);
    res.json(peoples)
  }
  });
})

app.get('/new/:name/',function(req,res){
  var people = new People({name: req.params.name});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  people.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
  // res.redirect('/');
});

app.get('/remove/:name',function(req,res){

    People.find({name:req.params.name}).remove(function(err){
      if(err){
        console.log("some thing wrong",+err);
      }
      res.redirect('/');
    })



  })

  app.get('/:name',function(req,res){
    console.log('hi');
    // console.log(id);
    People.find({name:req.params.name},function(err,peoples){
      if(err) {
        console.log('something went wrong',err);
      }
      else{
      res.json(peoples);
    }
  });
  })


app.listen(8000, function() {
    console.log("listening on port 8000");
})
