const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId = '5aa746c3180a690e04d39e96';
var userId = '6aa746c3180a690e04d39e96';
var userId = '5aa746c3180a690e04d39e9611';



User.findById(userId).then((user) => {
  if(!user){
    return console.log('user not found');
  }
  console.log('User: ', user);
}).catch((e) => {
  console.log('error: ', e);
})

//challenge
  //query users for id from robomongo
    //handle three cases
      //query works but there is no users
      //if user found, print to the screen
      //don't use is valid


var id = '5aaa9286ad7a2a7911f9652b';
//invalid id
var id = '5aaa9286ad7a2a7911f9652b11';
//id that doesn't exist
// var id = '6aaa9286ad7a2a7911f9652b';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// })
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('todo', todo);
// })

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));
