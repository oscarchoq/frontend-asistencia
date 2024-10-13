import axios from "./axios";

const baseURL = "auth";
export const loginRequest = (user) => axios.post(baseURL + "/login", user);
export const verifyTokenRequest = () => axios.get(baseURL + "/verify");
export const logoutRequest = () => axios.post(baseURL + "/logout");
