import language from "../languages/langIndex";
import { getLanguage } from "../services/authService";

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
const globalLanguage = getLanguage();
const languageText = language[globalLanguage || "en"];
const tabsData = [
  { title: languageText?.HOME, url: "/" },
  { title: languageText?.TOP_RATED, url: "/#topRated" },
  { title: languageText?.TRENDINGS, url: "/#trending" },
  { title: languageText?.ORIGINALS, url: "/#originals" },
  { title: languageText?.RECENTLY_ADDED, url: "/#recentlyAdded" },
  { title: languageText?.MY_WATCHLIST, url: "/mylist" },
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
