// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/Todo-App', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoBD server');
  }
  console.log('Connected to MongoDB server')

  //deleteMany

  // db.collection('Todos').deleteMany({text: 'study node'}).then((result) => {
  //   console.log(result);
  // })

  //deleteOne

  // db.collection('Todos').deleteOne({text: 'study node'}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log('result');
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({name: 'Bryan Thetford'}).then((result) => {
  //   console.log(result);
  // })


  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5aa3001a0be164f80b4dfed6')
  }).then((result) => {
    console.log('result');
    console.log(result);
  })



  // db.close();
});
