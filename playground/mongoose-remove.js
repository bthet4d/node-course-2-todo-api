const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(res);
// })
//
//
// Todo.findOneAndRemove({
//   _id: ''
// }).then((res) => {
//
// }, (e) => {
//
// })

// Todo.findByIdAndRemove()

// Todo.findByIdAndRemove('5aaf34e76ec1410a4df540f2').then((todo) => {
//   console.log('removing');
//   console.log(todo);
// })
