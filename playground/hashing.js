const {SHA256} = require('crypto-js');
const  jwt = require('jsonwebtoken');

// takes the data and signs it; creating the hash
//and returns the token

var data = {
  id: 10
}
var token = jwt.sign(data, '123abc');
console.log(`token: ${token}`);
var decoded = jwt.verify(token, '123abcc');
console.log('decoded');
console.log(decoded);


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
