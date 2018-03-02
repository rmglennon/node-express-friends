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
    
    // make array to hold the differences between scores
    var scoresArr = [];
    var difference = 0;
    var matchName = "";
    var matchPhoto = "";
    var match = 0;
    
    // this loop is going through the users (aka the number of surveys submitted)
    for (var i = 0; i < friendsData.length; i++) {
      difference = 0;
      
      // this loop is going through the elements of the individual scores
      for (var j = 0; j < scoresAsNum.length; j++) {
        
        // take absolute values of the differences
        difference += Math.abs(scoresAsNum[j] - friendsData[i].scores[j]);
      };
      // add this computed difference to array of other differences
      scoresArr.push(difference);
    }
    
    // look for fewest difference values
    for (var i = 0; i < scoresArr.length; i++) {
      if(scoresArr[i] <= scoresArr[match]) {
        match = i;
        matchName = friendsData[i].name;
        matchPhoto = friendsData[i].photo;
      }
    }
    
    // push the object into the friendsData array
    friendsData.push(dataObj);
    
    // send response of matching name and photo
    res.json({name: matchName, photo: matchPhoto});
    
  });
}