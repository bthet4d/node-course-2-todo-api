// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/Todo-App', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoBD server');
  }
  console.log('Connected to MongoDB server')

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5aa303236ec1410a4df4cd2d')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log('result');
    console.log(res);
  })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5aa21f55f2c348f3a682c6d4')
  }, {
    $set: {
      name: 'Bryan Thetford',
    },
    $inc: {
      age: 6
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log('result');
    console.log(res);
  })

  // db.close();
});
