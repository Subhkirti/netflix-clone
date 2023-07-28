import actionTypes from "../utils/actionTypes";

function setCurrentUser(usersData) {
  return {
    type: actionTypes.SET_USER,
    payload: usersData,
  };
}
export { setCurrentUser };
