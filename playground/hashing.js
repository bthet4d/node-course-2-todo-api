const {SHA256} = require('crypto-js');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (error, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$eieLZXmGuYsYRTA0KSfKV.XsGEvTEDaHj.npMbxYXQ8Es3AS7B1BO';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// takes the data and signs it; creating the hash
//and returns the token

var data = {
  id: 10
}
var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');


// var message = 'I am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);


// var data = {
//   id: 4
// }
//
//
//
//
//
// //salting the hash; adding something onto the hash
// // string 'somesecret' is the salt
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//
// //playing at man in the middle manipulation; uncommenting should trip
// //the manipulation clause
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash){
//   console.log('data not manipulated');
// }else{
//   console.log('data manipulated; do not trust');
// }
