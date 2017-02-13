// require express and path
var express = require("express");
var path = require("path");
// create the express app
var session = require('express-session');
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
var server = app.listen(8080, function() {
  console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
// var user1 =[];
//   var users = function(data){
//   user1.unshift(data);
//
//
// };
var User = function(args){
  var self = this;
  self.socket = args.socket;
  self.user = args.user
}
var users =[];
io.sockets.on('connection', function (socket) {
      console.log("WE ARE USING SOCKETS!");
      console.log(socket.id);
      socket.on('newuser_added',function(data){
        // var x = new users('name')
        session.id = socket.id;
        session.data = data;
        var newUser = new User({user: session.data, socket: session.id});
        users.push(newUser);
        console.log(users);
        console.log(newUser);
        socket.emit('existing_users',users);
        console.log(session.data);
        console.log(session.id);
        console.log(User);
        console.log(users);
        var username = data;
        console.log('new user added was:'+data);
        // console.log(user1);
       socket.broadcast.emit('new_user',username);


         console.log(users);



         socket.on('disconnect', function checkSocket (){

           var x= socket.id;
           console.log(x);
           console.log('user disconnected'+socket.id);

           for(var i=0; i<users.length; i++){
             if( users[i].socket === x ){
                var left = i;
                var name = users[left].user;
                io.emit('userleft',name);
                console.log(left+"left");
               users.splice(i, 1);
               var left =100;
               // delete users[i];
               // var index = users.indexOf(i);
               break;
              //  users[i].pop()

             }


           }




      });


    });
  });
