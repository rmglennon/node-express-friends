// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  
  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    
    // convert the friends values that came in as strings to an array of numbers
    var scoresAsNum = req.body.scores.map(Number);
    
    // make a new object with the incoming data and scores as numbers
    var dataObj = {
      name: req.body.name,
      photo: req.body.photo,
      scores: scoresAsNum
    };
    
    // make array to hold the differences between scores
    
    // var scoresArr = [];
          var difference = 0;
          var matchName = "";
          var matchPhoto = "";

    // this loop is going through the users (aka the number of surveys submitted)
    for (var i = 0; i < friendsData.length; i++) {
      difference = 0;

      // this loop is going through the elements of the individual scores
      for (var j = 0; j < scoresAsNum.length; j++) {
        
        // take absolute values of the differences
         difference += Math.abs(scoresAsNum[j] - friendsData[i].scores[j]);
         
         if (difference <= 40) {
           matchName = friendsData[i].name;
           matchPhoto = friendsData[i].photo;
         }
      };
    }
    //  scoresArr.push(difference);
      
console.log("difference " + difference);

// push the object into the friendsData array - unshift adds to beginning to avoid having to figure out the index of the new object
//friendsData.unshift(dataObj);
friendsData.push(dataObj);
console.log(friendsData);

res.json({name: matchName, photo: matchPhoto});

  });
}