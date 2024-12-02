import {
  changeStatusHorarioURI,
  createHorarioURI,
  getClaseByIdURI,
  getClasesURI,
  getHorariosURI,
  inscribirseURI,
  updateHorarioURI,
} from "@/api/academico";
import { toast } from "sonner";

const inscribirse = async (codigo) => {
  try {
    const response = await inscribirseURI({ codigo });
    if (response.data.estado === 1) {
      toast.success(response.data.message, {
        position: "top-right",
        duration: 2000,
      });
      return true;
    }
    toast.warning(response.data.message, {
      position: "top-right",
      duration: 2000,
    });
    return false;
  } catch (error) {
    // console.log(error.response.data.error);
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const getClases = async () => {
  try {
    const result = await getClasesURI();
    // console.log(result);
    return result.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const getClase = async (id) => {
  try {
    const result = await getClaseByIdURI(id);
    // console.log("por id", result);
    return result.data[0];
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const getHorarios = async (id) => {
  try {
    const result = await getHorariosURI(id);
    // console.log("horario por id", result);
    return result.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const createHorario = async (id, horario) => {
  try {
    const response = await createHorarioURI({ ...horario, ClaseID: id });
    // console.log("INS horario", response);
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
  }
};

const updateHorario = async (id, horario) => {
  try {
    // console.log("HORARIO => ", horario);
    // console.log("ID => ", id);
    const response = await updateHorarioURI(id, horario);
    // console.log("updateHorario => ", response);
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
      return true;
    }
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
    return false;
  }
};

const changeStatusHorario = async (id, data) => {
  try {
    const response = await changeStatusHorarioURI(id, { Activo: data });
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

export const useClase = () => {
  return {
    inscribirse,
    getClases,
    getClase,
    getHorarios,
    createHorario,
    updateHorario,
    changeStatusHorario,
  };
};
