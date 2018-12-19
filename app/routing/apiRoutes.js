// ==============Routing (json) ======================================
var friendList = require("../data/friends.js");

module.exports = function (app) {
    app.post("/api/friends", function (req, res) {
        var newFriendList = req.body;
        var newScores = req.body.scores;

        var smallestFriend = {
            id: 0,
            diffBet: 10000000000000000000000
        };


        // newFriendList.routeName = newFriendList.name.replace(/\s+/g, "").toLowerCase();
        // console.log(newFriendList);
        // console.log(newScores);
        for (var i = 0; i < friendList.length; i++) {
            // console.log(friendList[i].scores);
            // compare newScores with Friend List scores
            var diffBetween = 0;

            for (var j = 0; j < newScores.length; j++) {
                // diffBetween = Math.abs(parseInt(newScores[j]) - parseInt(friendList[i].scores[j]));
                diffBetween = diffBetween + Math.abs(parseInt(newScores[j]) - parseInt(friendList[i].scores[j]));
                // console.log(parseInt(newScores[j]) + ":" + parseInt(friendList[i].scores[j]));
                // console.log(diffBetween);

            };
            // console.log("smallestFriend.diffBet: " + smallestFriend.diffBet);
            // console.log("smallestFriend.id: " + smallestFriend.id);
            // console.log("diffBetween: " + diffBetween);
            if (smallestFriend.diffBet > diffBetween) {
                smallestFriend.id = i;
                smallestFriend.diffBet = diffBetween;

                // console.log("smallestFriend: " + smallestFriend);
            }
        };



        //add new data into friendList
        friendList.push(newFriendList);

        //send matching data to user
        res.json(friendList[smallestFriend.id]);
    });

    app.get("/api/friends", function (req, res) {
        res.json(friendList);
    });

}
