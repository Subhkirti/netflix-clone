async function fetchMovies() {
  const data = await fetch("/api/movies", {
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
  const data = await fetch("/api/add_movies", {
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
