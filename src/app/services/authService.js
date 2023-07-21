const languageKey = "appLanguage";
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
function setCurrentUser(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(userKey, JSON.stringify(data));
  }
}

function getCurrentUser() {
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
  const data = await fetch("/api/login", {
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
  const data = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

export { setLanguage, getLanguage, loginAuth, setCurrentUser, getCurrentUser,signUpAuth };
