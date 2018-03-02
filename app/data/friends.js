// You should save your application's data inside of app/data/friends.js as an array of objects. Each of these objects should roughly follow the format below.

// var friendsData = [
//   {
//   "name":"Ahmed",
//   "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
//   "scores":[
//       5,
//       1,
//       4,
//       4,
//       5,
//       1,
//       2,
//       5,
//       4,
//       1
//     ]
// }
// ];
// var friendsData = [];
var friendsData = [
  {
    "name": "Totally 80s",
    "photo": "assets/images/cassette.jpg",
    "scores": [1,1,1,1,1,1,1,1,1,1]
  }
];

// // Note how we export the array. This makes it accessible to other files using require.
module.exports = friendsData;