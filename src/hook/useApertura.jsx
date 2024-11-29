import {
  createAperturaURI,
  getAperturasURI,
  updateAperturaURI,
} from "@/api/academico";
import { toast } from "sonner";

const getAperturas = async (semestre) => {
  try {
    const response = await getAperturasURI(semestre);
    // console.log("get aperturas", response);
    return response.data;
  } catch (error) {
    console.log("Error al obtener las aperturas", error);
    toast.error("Error al obtener las aperturas", {
      position: "top-right",
      duration: 2000,
    });
  }
};

const createApertura = async (apertura) => {
  try {
    const response = await createAperturaURI(apertura);
    // console.log("response apertura => ", response);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        duration: 2000,
      });
      return true;
    }
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
    return false;
  }
};

const updateApertura = async (id, apertura) => {
  try {
    const response = await updateAperturaURI(id, apertura);
    // console.log(response);
    if (response.data.result === 0) {
      toast.success("No hay campos para actualizar", {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
    if (response.data.result >= 1) {
      toast.success("Registro actualizado", {
        position: "top-right",
        duration: 2000,
      });
      return 2;
    }
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
    return false;
  }
};

export const useApertura = () => {
  return {
    getAperturas,
    createApertura,
    updateApertura,
  };
};
