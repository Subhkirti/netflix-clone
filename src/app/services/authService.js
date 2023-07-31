import api from "./api";

const languageKey = "appLanguage";
const isUserLoggedInKey = "isUserLoggedIn";
const userKey = "user";

function setLanguage(value) {
  if (typeof window !== "undefined") {
    localStorage.setItem(languageKey, value || "en");
  }
}

function getLanguage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(languageKey) || "en";
  }
  return "en";
}
function setIsUserLoggedIn(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(isUserLoggedInKey, data);
  }
}

function getIsUserLoggedIn() {
  if (typeof window !== "undefined") {
    const userStatus = localStorage.getItem(isUserLoggedInKey);
    return userStatus === "true" ? true : false;
  } else {
    return false;
  }
}
function setLocalUser(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(userKey, JSON.stringify(data));
  }
}

function getLocalUser() {
  if (typeof window !== "undefined") {
    try {
      const userStr = localStorage.getItem(userKey);
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

async function loginAuth(reqBody) {
  // For already existed user
  const data = await fetch(api.LOGIN, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

async function signUpAuth(reqBody) {
  // For new user
  const data = await fetch(api.SIGNUP, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

async function fetchUserFromDB(reqBody) {
  const data = await fetch(api.FETCH_USER, {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

export {
  setLanguage,
  getLanguage,
  loginAuth,
  setIsUserLoggedIn,
  getIsUserLoggedIn,
  signUpAuth,
  getLocalUser,
  setLocalUser,
  fetchUserFromDB,
};
