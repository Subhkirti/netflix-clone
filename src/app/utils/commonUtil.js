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
export { hasOnlyDigits, isValidEmail,ellipSize };
