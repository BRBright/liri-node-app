var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var query = process.argv[2];

if ((query = "spotify-this-song")) {
  var search = process.argv.slice(3).join(" ");

  spotify
    .search({ type: "track", query: '"' + search + '"' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
} else if ((query = "moivie-this")) {
  var movieName = process.argv.slice(3).join(" ");

  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });
} else if ((query = "concert-this")) {
}
