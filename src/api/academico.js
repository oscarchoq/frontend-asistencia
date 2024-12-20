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

// CURSOS API
// http://localhost:3000/api/v1/academico/curso?semestre=8&&search=web

export const getCursosURI = (semestre = "", search = "") =>
  axios.get(baseURL + `/curso?semestre=${semestre}&&search=${search}`);

// APERTURA API
export const getAperturasURI = (semestre = "") =>
  axios.get(baseURL + `/apertura?semestre=${semestre}`);
export const createAperturaURI = (data) =>
  axios.post(baseURL + "/apertura", data);
export const updateAperturaURI = (id, data) =>
  axios.post(baseURL + `/apertura/${id}`, data);
export const updateDocenteURI = (id, data) =>
  axios.post(baseURL + `/apertura/${id}/docente`, data);

// CLASE API
const claseBaseURL = "clase";

// INSCRIPCION API
export const getClasesURI = () => axios.get(claseBaseURL);
export const getClaseByIdURI = (id) => axios.get(claseBaseURL + `/${id}`);
export const changeAutoAprobacionURI = (id, data) =>
  axios.post(claseBaseURL + `/${id}`, data);
export const inscribirseURI = (codigo) =>
  axios.post(claseBaseURL + "/inscripcion", codigo);
export const changeStatusInscripcionURI = (data) =>
  axios.post(claseBaseURL + "/inscripcion/estado", data);

// HORARIO API
export const getHorariosURI = (id) =>
  axios.get(claseBaseURL + `/${id}/horario`);
export const createHorarioURI = (data) =>
  axios.post(claseBaseURL + `/horario`, data);
export const updateHorarioURI = (id, data) =>
  axios.post(claseBaseURL + `/horario/${id}`, data);
export const changeStatusHorarioURI = (id, data) =>
  axios.post(claseBaseURL + `/horario/${id}/status`, data);

export const getInscritosURI = (id, estado = "", search = "") =>
  axios.get(
    claseBaseURL + `/${id}/inscritos?estado=${estado}&&search=${search}`
  );
// export const changeStatusInscripcionURI = (id, data) =>
//   axios.post(claseBaseURL + `/inscripcion/${id}/status`, data);

export const getAsistenciasURI = (id) =>
  axios.get(claseBaseURL + `/${id}/asistencia`);
export const createAsistenciaURI = (data) =>
  axios.post(claseBaseURL + `/asistencia`, data);
export const updateAsistenciaURI = (id, data) =>
  axios.post(claseBaseURL + `/asistencia/${id}`, data);

export const getAsistenciaIdURI = (id) =>
  axios.get(claseBaseURL + `/asistencia/${id}`);
export const marcarAsistenciaURI = (id, data) =>
  axios.post(claseBaseURL + `/asistencia/${id}/marcar`, data);
export const marcarAsistenciaGeotURI = (id, data) =>
  axios.post(claseBaseURL + `/asistencia/${id}/marcargeo`, data);
export const getAsistenciaGeoURI = (id) =>
  axios.get(claseBaseURL + `/asistencia/${id}/geo`);
