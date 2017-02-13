var express = require("express");
var path = require("path");
var http = require('http')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//connection mongoose string  => '/some mongo database'

var Samurai = Mongoose.models



app.get('/samurais/index',function(req,res){
console.log(req);
res.render("index",{samurais:samurais});
}) \index
app.get('/samurais/:id')//show
app.post('/samurais/create')//create
app.post('/samurais/update/:id')//update
app.post('/samurais/delete/:id')//delete
app.get('/samurais/edit/:id')//edit
app.get('/samurais/new')//new

app.listen(7000,function(){
//query to db to get all samurais

  console.log("server running on 7000");
});

// app.get('/samurais')
// app.get('/samurais/:id')
// app.post('/samurais')
// app.patch/put('/samurais/id')
// app.delete('/samurais/:id')
// app.get('/samurais/edit/:id')
// app.get('/samurais/new')
