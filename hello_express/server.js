var express = require('express');

var app = express();
// require body-parser
var bodyParser = require('body-parser');

var session =  require('express-session');

// use it!
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'codingdojorocks'}));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');


// app.get('/',function(request,response){
//
//   response.send("Hello express");
// });

// root route
app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});
// route to process new user form data:


// route to process new user form data:
app.post('/users', function (req, res){
  req.session.name = req.body.name;
  req.session.email = req.body.email;
  var x = req.body;
  console.log(x);
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.
    // res.render('users',{x});
    res.redirect('/')

})

app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});



app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"},
        // {name: x.name, email : x.email}
    ];
    response.render('users', {users: users_array});
})



app.use(express.static(__dirname + "/static"));
console.log(__dirname);
app.listen(8000, function(){

  console.log('listening on 8000');
});
