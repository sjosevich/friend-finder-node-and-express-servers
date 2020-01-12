// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" sources.
// These data sources hold arrays of information on the file friends.js.
// ===============================================================================

var friends = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;
    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: 1000
    };
   var userData = req.body;
   var userName = userData.name;
   var userScores = userData.scores;

   var b = userScores.map(function(item){
       return parseInt(item, 10);
   });
   //console.log(b)
   userData = {
       name: req.body.name,
       photo: req.body.photo,
       scores: b
   }

   
   var initialValue = 0
   var reducer = function (accumulator, item) {   // accumulator = InitailValue and item = to the first element of my array
    return accumulator + item
  }
  var sum = b.reduce(reducer, initialValue)      // reduce will help me to get the sum result of my score
   
   console.log("====================================")
   console.log("Name: " + userName);
   console.log("User score " + userScores);
   console.log("Total user score " + sum);
   console.log("====================================")

   for(var i = 0; i < friends.length; i++){
       console.log(friends[i].name + " score: " + friends[i].scores);
       console.log("Total Best friend score: " + friends[i].scores.reduce((a,b) => a + b,0));
       console.log("====================================")
       totalDifference = 0;
       
       

       var bfriendScore = friends[i].scores.reduce((a,b) => a + b,0);  //a better way to use the function reduce
      
       totalDifference += Math.abs(sum - bfriendScore);
       

       if(totalDifference <= bestMatch.friendDifference){
           bestMatch.name = friends[i].name;
           bestMatch.photo = friends[i].photo;
           bestMatch.friendDifference = totalDifference;
       }
       
   }
   console.log("Best Match");
   console.log("====================================");
   console.log(bestMatch);
   friends.push(userData);
   console.log("New User added");
   console.log(userData);
   res.json(bestMatch)

  });



  
};
