import axios from "./axios";

const baseURL = "academico";

// PERIODO API
export const getPeriodosURI = () => axios.get(baseURL + "/periodo");
export const getPeriodoByIdURI = (id) => axios.get(baseURL + `/periodo/${id}`);
export const createPeriodoURI = (data) =>
  axios.post(baseURL + "/periodo", data);
export const updatePeriodoURI = (id, data) =>
  axios.post(baseURL + `/periodo/${id}`, data);
export const changeStatusURI = (id, data) =>
  axios.post(baseURL + `/periodo/${id}/status`, data);
