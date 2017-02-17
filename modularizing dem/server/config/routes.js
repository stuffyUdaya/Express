var answers = require('../controllers/answers')
var topics = require('../controllers/topics')
var users = require('../controllers/users')
module.exports=function(app){

app.post('/users', users.create);
app.get('/users/:id', users.show);
app.post('/topics', topics.create);
app.get('/topics', topics.index);
app.get('/topics/:id', topics.show);
app.get('/answers', answers.index)
app.post('/answers', answers.create);
app.put('/answers/:id', answers.update);
}
