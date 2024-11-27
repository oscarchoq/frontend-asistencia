import {
  changeStatusURI,
  createPeriodoURI,
  getPeriodoByIdURI,
  getPeriodosURI,
  updatePeriodoURI,
} from "@/api/academico";
import { toast } from "sonner";

const getPeriodos = async () => {
  try {
    const response = await getPeriodosURI();
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error("Error al obtener los periodos", {
      position: "top-right",
      duration: 2000,
    });
  }
};

const getPeriodoById = async (id) => {
  try {
    const response = await getPeriodoByIdURI(id);
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error("Error al obtener el periodo", {
      position: "top-right",
      duration: 2000,
    });
  }
};

const createPeriodo = async (periodo) => {
  try {
    // console.log("PERIODO => ", periodo);
    const response = await createPeriodoURI(periodo);
    console.log("response periodo => ", response);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        duration: 2000,
      });
      return true;
    }
  } catch (error) {
    // console.log(error);
    if (error.status === 409) {
      // console.log("hOLI");
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

const updatePeriodo = async (id, periodo) => {
  try {
    // console.log("PERIODO => ", periodo);
    const response = await updatePeriodoURI(id, periodo);
    // console.log("updatePeriodoPerson => ", response);
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
    // console.log(error);
    if (error.status === 409) {
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

const changeStatus = async (id, data) => {
  try {
    // console.log("ID => ", id, " DATA => ", { Activo: data });
    const response = await changeStatusURI(id, { Activo: data });
    // console.log("changeStatusPerson => ", response);
    return response;
  } catch (error) {
    // console.log(error);
    if (error.status === 409) {
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

export const usePeriodo = () => {
  return {
    getPeriodos,
    getPeriodoById,
    createPeriodo,
    updatePeriodo,
    changeStatus,
  };
};
