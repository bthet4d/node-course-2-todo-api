// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/Todo-App', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoBD server');
  }
  console.log('Connected to MongoDB server')
  // db.collection('Todos').insertOne({
  //   text: 'Something else to do',
  //   completed: false
  // }, (err, res) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  //insert new doc into Users collection
  //with name, age, location, email

  // db.collection('Users').insertOne({
  //   name: 'Bryan Thetford',
  //   age: 35,
  //   location: 'Austin',
  //   email: 'bryan.thetord@gmail.com'
  // }, (err, res) => {
  //   if(err){
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  //   console.log('');
  //   console.log(res.ops[0]._id.getTimestamp());
  // })


  db.close();
});
