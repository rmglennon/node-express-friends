// require the data file
var friendsData = require("../data/friends");

// set up routing
module.exports = function(app) {
  
  // show the results as JSON on /api/friends
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  
  // set up post to add data and compare it to other friends
  app.post("/api/friends", function(req, res) {
    
    // use req.body from body-parser middleware
    // convert the friends values that came in as strings to an array of numbers
    var scoresAsNum = req.body.scores.map(Number);
    
    // make a new object with the incoming data and scores as numbers
    var dataObj = {
      name: req.body.name,
      photo: req.body.photo,
      scores: scoresAsNum
    };
    
    // make array to hold the differences between scores and look at the differences between the current users and other friends
    var scoresArr = [];
    var difference = 0;
    var matchName = "";
    var matchPhoto = "";
    
    // this loop is going through all the friends
    for (var i = 0; i < friendsData.length; i++) {
      difference = 0;
      
      // this loop is going through the elements of the individual scores
      for (var j = 0; j < scoresAsNum.length; j++) {
        
        // take absolute values of the differences of each element and add them 
        difference += Math.abs(scoresAsNum[j] - friendsData[i].scores[j]);
      };
      // add the total difference to array of differences for all users
      scoresArr.push(difference);
    }
    
    // make a variable that is one more than the max difference between questions
    var smallestDiff = 41; 
    
    // check for smallest difference in the array
    for (var i = 0; i < scoresArr.length; i++) {

      if (scoresArr[i] <= smallestDiff) {
        smallestDiff = scoresArr[i];
        matchName = friendsData[i].name;
        matchPhoto = friendsData[i].photo;
      }
    }
    
    // push the new object into the friendsData array
    friendsData.push(dataObj);
    
    // send response of closest-matching name and photo
    res.json({name: matchName, photo: matchPhoto});
    
  });
}
