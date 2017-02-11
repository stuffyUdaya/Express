// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
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
io.sockets.on('connection', function (socket) {
      console.log("WE ARE USING SOCKETS!");
      console.log(socket.id);
      socket.on("button_clicked", function (data){
        var counter = data;
        console.log('counter:' +data);
        io.emit('updated_counter', counter);

      });

      socket.on("resetbutton_clicked", function (data){
        var counter = data;
        console.log('counter:' +data);
        io.emit('delete_counter', counter);
      });


    });
