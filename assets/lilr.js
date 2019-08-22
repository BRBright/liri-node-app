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

        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
        console.log("Song name: " + inquirerResponse.search);
        console.log(
          "Preview Link: " + data.tracks.items[0].album.external_urls.spotify
        );
        console.log("Album Name: " + data.tracks.items[0].album.name);
      });
    } else if (inquirerResponse.searchChoice === "Search for a movie.") {
      var movieName = inquirerResponse.search;

      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=short&apikey=trilogy";

      axios.get(queryUrl).then(function(response) {
        var jsonData = response.data;

        if (err) {
          return console.log("Error occurred: " + err);
        }

        console.log("Title: " + jsonData.Title);
        console.log("Released: " + jsonData.Released);
        console.log("IMDB Rating: " + jsonData.Ratings[0].Source.Value);
        console.log("Rotten Tomatoes: " + jsonData.Ratings[1].Source.Value);
        console.log("Country made: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
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

        if (err) {
          return console.log("Error occurred: " + err);
        }

        console.log("Name of venue: " + jsonData[0].venue.name);
        console.log(
          "Location: " +
            jsonData[0].venue.city +
            ", " +
            jsonData[0].venue.region +
            ", " +
            jsonData[0].venue.country
        );
        console.log("Date of Event: " + jsonData[0].datetime);
      });
    }
  });
