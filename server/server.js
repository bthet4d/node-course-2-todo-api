require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/users', (req, res) => {

  var userData = _.pick(req.body, ['email', 'password']);
  var user = new User(userData);


  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


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
})

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;

  //
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send({});
  })
})


app.patch('/todos/:id', (req, res) => {

  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  // return res.send({});

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  })


})



app.listen(port, () => {
  console.log(`started up at port ${port}`);
})


module.exports = {app};
