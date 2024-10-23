import axios from "axios";

const BACKEND_URL = "https://mwrjsz-3000.csb.app";
// const BACKEND_URL = "http://localhost:3000";

const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default instance;
