

var rabbits = require('../controllers/rabbits.js')
module.exports = function(app){
app.get('/', function(req, res) {

  rabbits.showall(req,res)
  // showall
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

  rabbits.showone(req,res)

  // show one
})


// Editing a rabbit

app.get('/mongooses/edit/:id',function(req,res){

  rabbits.edit(req,res)
  // edit
})

// updating a rabbit


app.post('/mongooses/:id',function(req,res){

rabbits.update(req,res)
  // update

});

// Deleting a rabbit

  app.post('/mongooses/delete/:id',function(req,res){
    console.log(req.params.id);

rabbits.delete(req,res)
    // delete


  })

// Add User Request


// updating databse with new user


app.post('/mongooses', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body

  rabbits.add(req,res)

  // add
});
}
