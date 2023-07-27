async function addToWatchList(reqBody) {
  const data = await fetch("/api/add_to_watchlist", {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}
async function fetchWatchList(reqBody) {
  const data = await fetch("/api/fetch_watchlist", {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}
export { addToWatchList,fetchWatchList };
