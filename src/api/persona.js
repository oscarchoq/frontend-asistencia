import axios from "./axios";

const baseURL = "persona";
// reniec API
export const findReniecURI = (dni) => axios.post(baseURL + "/reniec", dni);

// ESTUDIANTE API
export const registerStudent = (data) =>
  axios.post(baseURL + "/estudiante", data);
export const getStudents = () => axios.get(baseURL + "/estudiante");
export const getStudentById = (id) => axios.get(baseURL + `/estudiante/${id}`);
export const updateStudent = (id, data) =>
  axios.post(baseURL + `/estudiante/${id}`, data);
export const changeStatusURI = (id, data) =>
  axios.post(baseURL + `/estudiante/${id}/status`, data);

// DOCENTE API
export const registerDocente = (data) => axios.post(baseURL + "/docente", data);
export const getDocentes = () => axios.get(baseURL + "/docente");
export const getDocenteById = (id) => axios.get(baseURL + `/docente/${id}`);
export const updateDocente = (id, data) =>
  axios.post(baseURL + `/docente/${id}`, data);
