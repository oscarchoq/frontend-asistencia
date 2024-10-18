import axios from "./axios";

const baseURL = "persona";
export const registerStudent = (data) =>
  axios.post(baseURL + "/estudiante", data);
