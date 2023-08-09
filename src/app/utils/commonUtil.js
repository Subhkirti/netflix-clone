function hasOnlyDigits(value) {
  var regex = /^\d+$/;
  return regex.test(value);
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email ? emailPattern.test(email) : false;
}

function ellipSize(text, maxLength) {
  return text && text.length > maxLength
    ? text.substr(0, maxLength) + "..."
    : text;
}

const tabsData = [
  { title: "Home", url: "/" },
  { title: "Top Rated", url: "/#topRated" },
  { title: "Trendings", url: "/#trending" },
  { title: "Originals", url: "/#originals" },
  { title: "Recently Added", url: "/#recentlyAdded" },
  { title: "My Watchlist", url: "/mylist" },
];

function standardDate(date) {
  const inputDate = date;
  const parsedDate = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

function movieDetailUrl(movieId) {
  const url = movieId ? `/detail/${btoa(movieId)}` : "/";
  return url;
}

export {
  hasOnlyDigits,
  isValidEmail,
  ellipSize,
  tabsData,
  standardDate,
  movieDetailUrl,
};
