import axios from "./axios";

const baseURL = "combos";
export const comboGradoInstruccion = () =>
  axios.get(baseURL + "/gradoInstruccion");
export const comboTipoDocumento = () => axios.get(baseURL + "/tipoDocumento");
export const comboEstadoCivil = () => axios.get(baseURL + "/estadoCivil");
