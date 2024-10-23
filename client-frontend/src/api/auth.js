import axios from "./config";

export const loginUserRequest = (user) => axios.post("api/users/login", user);

export const registerUserRequest = (user) =>
  axios.post("api/users/register", user);

export const verifyTokenRequest = () => axios.get("api/users/check");

export const logoutUserRequest = () => axios.get("api/users/logout");
