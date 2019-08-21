var axios = require("axios");
var inquirer = require("inquirer");
var keys = require("./keys.js");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to search for?",
      choices: [
        "Search Spotify for a song.",
        "Look for a conert by artist.",
        "Search for a movie."
      ],
      name: "searchChoice"
    },
    {
      type: "input",
      message: "Search",
      name: "search"
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.searchChoice === "Search Spotify for a song.") {
      var search = inquirerResponse.search;

      spotify.search({ type: "track", query: search }, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        console.log(data);
      });
    } else if (inquirerResponse.searchChoice === "Search for a movie.") {
      var movieName = inquirerResponse.search;

      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=short&apikey=trilogy";

      axios.get(queryUrl).then(function(response) {
        var jsonData = response.data;
        console.log(jsonData);
        if (err) throw err;
        console.log(showData);
      });
    } else if (
      inquirerResponse.searchChoice === "Look for a conert by artist."
    ) {
      var artist = inquirerResponse.search;

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
    }
  });
