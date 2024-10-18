import {
  comboEstadoCivil,
  comboGradoInstruccion,
  comboTipoDocumento,
} from "@/api/combos";

const fetchGradoInstruccion = async () => {
  try {
    const response = await comboGradoInstruccion();
    return response.data;
  } catch (error) {
    console.log("Error al obtener el comboGradoInstruccion", error);
  }
};
const fetchTipoDocumento = async () => {
  try {
    const response = await comboTipoDocumento();
    return response.data;
  } catch (error) {
    console.log("Error al obtener el comboTipoDocumento", error);
  }
};
const fetchEstadoCivil = async () => {
  try {
    const response = await comboEstadoCivil();
    return response.data;
  } catch (error) {
    console.log("Error al obtener el comboEstadoCivil", error);
  }
};

export const useFetchCombos = () => {
  return {
    fetchGradoInstruccion,
    fetchTipoDocumento,
    fetchEstadoCivil,
  };
};
