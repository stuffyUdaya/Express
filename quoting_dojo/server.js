var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_quote');
var QuoteSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 3},
	quote: {type: String, required: true}
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote')
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

app.get('/quotes',function(req,res){

  Quote.find({},function(err,quotes){
    if(err){
      console.log('went wrong');
    }
    else{
      res.render('quotes',{quotes:quotes});
    }
  });
})
app.get('/',function(req,res){
  res.render('index');
})
app.post('/quotes',function(req,res){
  console.log('POSTDATA', req.body);
  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err){
    if(err){
      console.log("went wrong",err);
    }
    res.redirect('/');
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
