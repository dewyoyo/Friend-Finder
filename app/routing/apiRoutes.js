// ==============Routing (json) ======================================

// Core node package for reading and writing files
var fs = require("fs");

var friendList = require("../data/friends.js");

module.exports = function (app) {
    app.post("/api/friends", function (req, res) {
        var newFriendList = req.body;
        var newScores = req.body.scores;

        var smallestFriend = {
            id: 0,
            diffBet: 1000
        };

        // Make text for friend.js
        var txtFriendList = "var friendList =  [\n";

        for (var i = 0; i < friendList.length; i++) {
            // var for comparing scores
            var diffBetween = 0;

            for (var j = 0; j < newScores.length; j++) {
                // compare newScores with Friend List scores
                diffBetween = diffBetween + Math.abs(parseInt(newScores[j]) - parseInt(friendList[i].scores[j]));
            };

            // store best matching friend
            if (smallestFriend.diffBet > diffBetween) {
                smallestFriend.id = i;
                smallestFriend.diffBet = diffBetween;
            }

            //Make text for friend.js --> print current friends
            txtFriendList += `{ "name": "${friendList[i].name}",\n`;
            txtFriendList += `"photo": "${friendList[i].photo}",\n`;
            txtFriendList += `"scores": [${friendList[i].scores}]\n},\n`;
        };

        // Make text for friend.js --> add newFriend
        txtFriendList += `{ "name": "${newFriendList.name}",\n`;
        txtFriendList += `"photo": "${newFriendList.photo}",\n`;
        txtFriendList += `"scores": [${newFriendList.scores}]\n}\n`;

        txtFriendList += "];\nmodule.exports = friendList;";
        // console.log(txtFriendList);


        // This block of code will create a file called "movies.txt".
        fs.writeFile("./app/data/friends.js", txtFriendList, function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            console.log("friends.js was updated!");

        });

        //add new data into friendList
        friendList.push(newFriendList);
        console.log(friendList);

        //send matching data to user
        res.json(friendList[smallestFriend.id]);
    });

    // send json data
    app.get("/api/friends", function (req, res) {
        res.json(friendList);
    });

}
