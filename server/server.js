require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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


app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    //create new token
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })

  }).catch((e) => {
    res.status(400).send(e);
  })
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {

  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })


})


app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/todos', authenticate, (req, res) => {
  //get todos that belong into logged in user
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    console.log('error', e);
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

    //validate id
    if(!ObjectID.isValid(id)){
      console.log('ID not valid');
      return res.status(404).send();
    }
    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if(!todo){
        return res.status(404).send()
      }

      res.status(200).send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
})

app.delete('/todos/:id', authenticate, (req, res) => {
  //get the id
  var id = req.params.id;

  //
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send({});
  })
})


app.patch('/todos/:id', authenticate, (req, res) => {

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

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
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
