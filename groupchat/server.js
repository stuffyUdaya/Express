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
var server = app.listen(7080, function() {
  console.log("listening on port 7080");
});
var io = require('socket.io').listen(server);
var User = function(args){
  var self = this;
  self.socket = args.socket;
  self.user = args.user;

}
var users =[];
var Msg = function(args){
  var self = this;
  self.msg  = args.msg;
  self.name = args.name;
}
var messages = [];
io.sockets.on('connection', function (socket) {
      console.log("WE ARE USING SOCKETS!");
      console.log(socket.id);
      socket.on('newuser_added',function(data){
        session.id = socket.id;
        session.data = data;
        var newUser = new User({user: session.data, socket: session.id});
        users.push(newUser);
        console.log(users);
        socket.broadcast.emit('new_user',session.data);
      

        socket.on('msg_added',function(data){
          console.log(data);
          session.msg = data.msg;
          var name = data.name;
          var newMsg = new Msg({msg: session.msg , name:name });
          messages.push(newMsg);
          console.log(messages);
          var data = data;
          io.emit('newmsg', messages);
        });



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

        // for(var i=0; i<users.length; i++){
        //   if( users[i].socket === socket.id ){
        //     users.splice(i, 1);
        //     var left = users[i];
        //     console.log(left+"left");
        //     // delete users[i];
        //     // var index = users.indexOf(i);
        //     break;
           //  users[i].pop()

          }


        }

    // var z = checkSocket(socket.id);
    // function checkSocket(w){
    //        for(var i=0; i<users.length; i++){
    //          if( users[i].socket = w  ){
    //            var left = users[i];
    //           //  users[i].pop()
    //          }
    //        }
    //        console.log(left);
    //        console.log(users);
    //      }



      });
      console.log(users);

    });
  });
