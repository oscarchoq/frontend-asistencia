import {
  changeAutoAprobacionURI,
  changeStatusHorarioURI,
  changeStatusInscripcionURI,
  createAsistenciaURI,
  createHorarioURI,
  getAsistenciaGeoURI,
  getAsistenciaIdURI,
  getAsistenciasURI,
  getClaseByIdURI,
  getClasesURI,
  getHorariosURI,
  getInscritosURI,
  inscribirseURI,
  marcarAsistenciaGeotURI,
  marcarAsistenciaURI,
  updateAsistenciaURI,
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
    // console.log("llega al state", id, horario);
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
    // console.log("changeStatusHorario => ", response);
    toast.success(response.data.message, {
      position: "top-right",
      duration: 2000,
    });
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

const getInscritos = async (id, estado, search) => {
  try {
    const response = await getInscritosURI(
      id,
      estado === "TODOS" ? "" : estado,
      search
    );
    return response.data;
  } catch (error) {
    toast.error("Error al obtener los cursos", {
      position: "top-right",
      duration: 2000,
    });
  }
};

const changeStatusInscripcion = async (id, estado) => {
  try {
    const response = await changeStatusInscripcionURI({
      InscripcionID: id,
      EstadoInscripcion: estado,
    });
    console.log("changeStatusInscrito => ", response);
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

const changeAutoAprobacion = async (id, estado) => {
  try {
    const response = await changeAutoAprobacionURI(id, {
      AprobacionAutomatica: estado,
    });
    console.log("changeS auto aprobacion => ", response);
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

const getAsistencias = async (id) => {
  try {
    const result = await getAsistenciasURI(id);
    // console.log("horario por id", result);
    return result.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const createAsistencia = async (id, asistencia) => {
  try {
    // console.log("llega al state", id, horario);
    const response = await createAsistenciaURI({ ...asistencia, ClaseID: id });
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

const updateAsistencia = async (id, asistencia) => {
  try {
    // console.log("HORARIO => ", horario);
    // console.log("ID => ", id);
    const response = await updateAsistenciaURI(id, asistencia);
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

const getAsistenciasById = async (id) => {
  try {
    const result = await getAsistenciaIdURI(id);
    // console.log("asistencias por id", result);
    return result.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
  }
};

const marcarAsistencia = async (id, data) => {
  try {
    // console.log("HORARIO => ", horario);
    // console.log("ID => ", id);
    const response = await marcarAsistenciaURI(id, data);
    // console.log("marcar asistencia => ", response);
    if (response.status === 200) {
      toast.success(response.data.message, {
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

const marcarAsistenciaGeo = async (id, data) => {
  try {
    // console.log("HORARIO => ", data);
    // console.log("claseID => ", id);
    const response = await marcarAsistenciaGeotURI(id, data);
    // console.log("marcar asistencia => ", response);
    if (response.status === 200) {
      toast.success(response.data.message, {
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

const getAsistenciaGeo = async (id) => {
  try {
    const result = await getAsistenciaGeoURI(id);
    // console.log("asistencia est por id", result);
    return result.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-right",
      duration: 2000,
    });
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
    getInscritos,
    changeStatusInscripcion,
    changeAutoAprobacion,
    getAsistencias,
    createAsistencia,
    updateAsistencia,
    getAsistenciasById,
    marcarAsistencia,
    getAsistenciaGeo,
    marcarAsistenciaGeo,
  };
};
