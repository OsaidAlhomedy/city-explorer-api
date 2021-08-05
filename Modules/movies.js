const axios = require("axios");
let memoryArray = {};
async function moviesHandler(request, response) {
  let q = request.query.q;
  let key = q;
  let URL2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${q}`;

  if (memoryArray[key] !== undefined) {
    response.send(memoryArray[key]);
    console.log("sent from movies Memory");
  } else {
    axios.get(URL2).then((result) => {
      let moviesData = result.data.results;
      let movieArray = moviesData.map((n) => {
        return new Movies(
          n.title,
          n.overview,
          n.vote_average,
          n.vote_count,
          n.poster_path,
          n.popularity,
          n.release_date
        );
      });
      memoryArray[q] = movieArray;
      response.send(movieArray);
      console.log("sent from movies API");
    });
  }
}

class Movies {
  constructor(title, overview, vote, totalVotes, url, popularity, release) {
    this.title = title;
    this.overview = overview;
    this.vote = vote;
    this.totalVotes = totalVotes;
    this.url = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${url}`;
    this.popularity = popularity;
    this.release = release;
  }
}
module.exports = moviesHandler;
