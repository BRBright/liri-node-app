var axios = require("axios");
var keys = require("./keys.js");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var lookUpCode = process.argv[2];

if ((lookUpCode = "spotify-this-song")) {
  var search = process.argv.slice(3).join(" ");

  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(data);
  });
} else if ((lookUpCode = "moivie-this")) {
  var movieName = process.argv.slice(3).join(" ");

  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    var jsonData = response.data;
    console.log(jsonData);
    if (err) throw err;
    console.log(showData);
  });
} else if ((lookUpCode = "concert-this")) {
  var artist = process.argv.slice(3).join(" ");

  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(function(response) {
    var jsonData = response.data;
    console.log(jsonData);
    if (err) throw err;
    console.log(showData);
  });
} else {
  console.log("Spelling.");
}
