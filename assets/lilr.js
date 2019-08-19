var axios = require("axios");
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var lookUpCode = process.argv[2];

/*if ((lookUpCode = "spotify-this-song")) {
  var search = process.argv.slice(3).join(" ");

  spotify
    .search({ type: "track", query: '"' + search + '"' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
} else */ if (
  (lookUpCode = "moivie-this")
) {
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
}
