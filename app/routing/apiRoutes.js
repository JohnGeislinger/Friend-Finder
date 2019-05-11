// =======================================================
// Load Data
// =======================================================

const friends = require("../data/friends");

// =======================================================
// Routing
// =======================================================

module.exports = function(app) {
    
    // API GET Request
    app.get("api/friends", function(req, res) {
        res.json(friendArray);
    });

    // API POST Request
    app.post("api/friends", function(req, res) {
        let bestFriend = {
            name: "",
            photo: "",
            friendDifference: 100
        }

        let userData = req.body;
        let userScores = userData.scores;

        let totalDifference;

        for (let i = 0; i < friendArray.length; i++) {
            let currentFriend = friendArray[i];
            totalDifference = 0;

            for (let j = 0; j < friendArray.length; j++) {
                let currentFriendScore = currentFriend.scores[j];
                let currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestFriend.friendDifference) {
                bestFriend.name = currentFriend.name;
                bestFriend.photo = currentFriend.photo;
                bestFriend.friendDifference = totalDifference;
            }
        }
        friendArray.push(userData);

        res.json(bestFriend);
    });
};