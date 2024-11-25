import {
  changeStatusURI,
  createPeriodoURI,
  getPeriodoByIdURI,
  getPeriodosURI,
  updatePeriodoURI,
} from "@/api/academico";
import { toast } from "sonner";

// const registerPerson = async (typePerson, person) => {
//   try {
//     // TipoPersonaID: 1=ADMINISTRADOR; 2=ESTUDIANTE; 3=DOCENTE
//     // Insert de estudiante
//     if (typePerson === 1) {
//       // console.log("INSERTAR ESTUDIANTE => ", person);
//       const response = await registerStudent({ ...person, TipoPersonaID: 2 });
//       // console.log(response);
//       if (response.status === 200) {
//         toast.success(response.data.message, {
//           position: "top-right",
//           duration: 2000,
//         });
//         return true;
//       }
//     }

//     // Insert de docente
//     if (typePerson === 2) {
//       // console.log("INSERTAR DDOCENTE => ", person);
//       const response = await registerDocente({ ...person, TipoPersonaID: 3 });
//       // console.log(response);
//       if (response.status === 200) {
//         toast.success(response.data.message, {
//           position: "top-right",
//           duration: 2000,
//         });
//         return true;
//       }
//     }
//   } catch (error) {
//     // console.log(error);
//     if (error.status === 409) {
//       // console.log("hOLI");
//       toast.error(error.response.data.error, {
//         position: "top-right",
//         duration: 2000,
//       });
//       return false;
//     }
//   }
// };

// const getPersona = async (typePerson) => {
//   try {
//     if (typePerson === 1) {
//       const response = await getStudents();
//       // console.log(response.data);
//       return response.data;
//     }

//     if (typePerson === 2) {
//       const response = await getDocentes();
//       // console.log(response.data);
//       return response.data;
//     }
//   } catch (error) {}
// };
// const getPersonaById = async (id, typePerson) => {
//   try {
//     if (typePerson === 1) {
//       const response = await getStudentById(id);
//       // console.log(response.data);
//       return response.data;
//     }

//     if (typePerson === 2) {
//       const response = await getDocenteById(id);
//       // console.log(response.data);
//       return response.data;
//     }
//   } catch (error) {}
// };

// const updatePerson = async (typePerson, id, person) => {
//   try {
//     // Insert de estudiante
//     if (typePerson === 1) {
//       // Estudiante
//       const response = await updateStudent(id, {
//         ...person,
//         TipoPersonaID: 2,
//       });
//       // console.log(response.data.result);
//       if (response.data.result === 0) {
//         toast.success("No hay campos para actualizar", {
//           position: "top-right",
//           duration: 2000,
//         });
//         return 1;
//       }
//       if (response.data.result >= 1) {
//         toast.success("Registro actualizado", {
//           position: "top-right",
//           duration: 2000,
//         });
//         return 2;
//       }
//     }

//     if (typePerson === 2) {
//       // Docente
//       // console.log("Si manda no? ");
//       const response = await updateDocente(id, {
//         ...person,
//         TipoPersonaID: 3,
//       });
//       // console.log(response.data.result);
//       if (response.data.result === 0) {
//         toast.success("No hay campos para actualizar", {
//           position: "top-right",
//           duration: 2000,
//         });
//         return 1;
//       }
//       if (response.data.result >= 1) {
//         toast.success("Registro actualizado", {
//           position: "top-right",
//           duration: 2000,
//         });
//         return 2;
//       }
//     }
//   } catch (error) {
//     // console.log(error);
//     if (error.status === 409) {
//       // console.log("hOLI");
//       toast.error(error.response.data.error, {
//         position: "top-right",
//         duration: 2000,
//       });
//       return false;
//     }
//   }
// };

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
