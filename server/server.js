
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/todos', (req, res) => {
  console.log('getting todos');
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    console.log('error', e);
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

    //validate id
    if(!ObjectID.isValid(id)){
      console.log('ID not valid');
      return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send()
      }

      res.status(200).send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  //if valid; query by id
    //success
      //if id send back todo
      //if not send back empty body
    //error
      //send back 400 and send back empty object
})


app.listen(3000, () => {
  console.log('Started on port 3000');
})


module.exports = {app};
