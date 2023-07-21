import actionTypes from "../utils/actionTypes";

function fetchUsers() {
  return {
    type: actionTypes.GET_USERS,
  };
}

function setUsers(usersData) {
  return {
    type: actionTypes.SET_USERS,
    payload: usersData,
  };
}
export { fetchUsers, setUsers };
