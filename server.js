// add required packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// set up express and use extended: true to post nested data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/app/public"));

// require route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// start server listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});