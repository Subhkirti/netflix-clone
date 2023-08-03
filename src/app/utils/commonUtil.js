function hasOnlyDigits(value) {
  var regex = /^\d+$/;
  return regex.test(value);
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email ? emailPattern.test(email):false;
}

function ellipSize(text, maxLength) {
  return text && text.length > maxLength
    ? text.substr(0, maxLength) + '...'
    : text;
}

const tabsData = [
  { title: "Home", url: "/" },
  { title: "TV Shows", url: "/tv_shows" },
  { title: "Movies", url: "/movies" },
  { title: "Originals", url: "/originals" },
  { title: "Recently Added", url: "/recenlty_added" },
  { title: "My List", url: "/mylist" },
];
export { hasOnlyDigits, isValidEmail,ellipSize,tabsData };
