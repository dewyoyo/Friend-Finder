// dependencies
var express = require("express");
var path = require("path");

// set up express app
var app = express();
var PORT = process.env.PORT || 3000;

// set up express app to handle data parging(middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//dataset --> variables
// app.use(express.static(path.join(__dirname, "./public")));

//ROUTER
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// ============Start server to begin listening==================
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
})