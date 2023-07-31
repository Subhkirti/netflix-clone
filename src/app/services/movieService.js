import api from "./api";

async function addToWatchList(reqBody) {
  const data = await fetch(api.ADD_TO_WATCH_LIST, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}
async function removeFromWatchList(reqBody) {
  const data = await fetch(api.REMOVE_FROM_WATCH_LIST, {
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
  const data = await fetch(api.FETCH_WATCH_LIST, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}
export { addToWatchList, fetchWatchList, removeFromWatchList };
