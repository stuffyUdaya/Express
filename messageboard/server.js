var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/basic_message');
var PostSchema = new mongoose.Schema({
  pname: {type: String, required: true, minlength: 3},
	message: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true})
mongoose.model('Post',PostSchema);
var Post = mongoose.model('Post')

var CommentSchema = new mongoose.Schema({
  cname: {type: String, required: true, minlength: 3},
	comment: {type: String, required: true},
  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
}, {timestamps: true})

mongoose.model('Comment',CommentSchema);
var Comment = mongoose.model('Comment')

app.get('/',function(req,res){
  Post.find({}).populate('comments').exec(function(err,posts){
    if(err){
      console.log("Something went wrong", err);
    }
    else{

          res.render('index',{posts:posts});
        }
      })

    })


app.post('/addpost',function(req,res){
  console.log("POSTDATA",req.body);
  var post = new Post({pname: req.body.pname,
  message: req.body.message });
  post.save(function(err){
    if(err){
      console.log("some thing went wrong",err);

    }
    res.redirect('/');
  })
})

app.post('/addcomment/:id',function(req,res){
  console.log(req.params.id);
  console.log("CommentData",req.body);
  var comment = new Comment({cname: req.body.cname, comment: req.body.comment, _post:req.params.id });
  Post.findById(req.params.id,function(err,post){

      post.comments.push(comment);
      post.save(function(err){
        comment.save(function(err){
          if(err){
            console.log("error",err);

          }
          res.redirect('/');
        })
        if(err){
          console.log('error',err);
        }

  })

})
})
app.listen(8000, function() {
    console.log("listening on port 8000");
})
