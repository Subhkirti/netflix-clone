import api from "./api";

async function fetchMovies() {
  const data = await fetch(api.GET_MOVIES, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

async function addMovies(url) {
  const movieResults = await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });

  const reqBody = { movies: movieResults.results };
  const data = await fetch(api.ADD_MOVIES, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

export { fetchMovies, addMovies };
