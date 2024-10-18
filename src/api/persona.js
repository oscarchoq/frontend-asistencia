import axios from "./axios";

const baseURL = "persona";
export const registerStudent = (data) =>
  axios.post(baseURL + "/estudiante", data);
export const getStudents = () => axios.get(baseURL + "/estudiante");
export const getStudentById = (id) => axios.get(baseURL + `/estudiante/${id}`);
export const updateStudent = (id, data) =>
  axios.post(baseURL + `/estudiante/${id}`, data);
