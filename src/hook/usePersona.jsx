import {
  getStudentById,
  getStudents,
  registerStudent,
  updateStudent,
  findReniecURI,
  changeStatusURI,
  registerDocente,
  getDocentes,
  getDocenteById,
  updateDocente,
} from "@/api/persona";
import { toast } from "sonner";

const findReniec = async (dni) => {
  try {
    const data = { dni };
    const response = await findReniecURI(data);
    return response.data;
  } catch (error) {
    console.log("Error al obtener el estudiante por DNI", error);
  }
};

const registerPerson = async (typePerson, person) => {
  try {
    // TipoPersonaID: 1=ADMINISTRADOR; 2=ESTUDIANTE; 3=DOCENTE
    // Insert de estudiante
    if (typePerson === 1) {
      console.log("INSERTAR ESTUDIANTE => ", person);
      const response = await registerStudent({ ...person, TipoPersonaID: 2 });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });
        return true;
      }
    }

    // Insert de docente
    if (typePerson === 2) {
      console.log("INSERTAR DDOCENTE => ", person);
      const response = await registerDocente({ ...person, TipoPersonaID: 3 });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });
        return true;
      }
    }
  } catch (error) {
    // console.log(error);
    if (error.status === 409) {
      console.log("hOLI");
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

const getPersona = async (typePerson) => {
  try {
    if (typePerson === 1) {
      const response = await getStudents();
      // console.log(response.data);
      return response.data;
    }

    if (typePerson === 2) {
      const response = await getDocentes();
      console.log(response.data);
      return response.data;
    }
  } catch (error) {}
};
const getPersonaById = async (id, typePerson) => {
  try {
    if (typePerson === 1) {
      const response = await getStudentById(id);
      console.log(response.data);
      return response.data;
    }

    if (typePerson === 2) {
      const response = await getDocenteById(id);
      console.log(response.data);
      return response.data;
    }
  } catch (error) {}
};

const updatePerson = async (typePerson, id, person) => {
  try {
    // Insert de estudiante
    if (typePerson === 1) {
      // Estudiante
      const response = await updateStudent(id, {
        ...person,
        TipoPersonaID: 2,
      });
      console.log(response.data.result);
      if (response.data.result === 0) {
        toast.success("No hay campos para actualizar", {
          position: "top-right",
          duration: 2000,
        });
        return 1;
      }
      if (response.data.result >= 1) {
        toast.success("Registro actualizado", {
          position: "top-right",
          duration: 2000,
        });
        return 2;
      }
    }

    if (typePerson === 2) {
      // Docente
      console.log("Si manda no? ");
      const response = await updateDocente(id, {
        ...person,
        TipoPersonaID: 3,
      });
      console.log(response.data.result);
      if (response.data.result === 0) {
        toast.success("No hay campos para actualizar", {
          position: "top-right",
          duration: 2000,
        });
        return 1;
      }
      if (response.data.result >= 1) {
        toast.success("Registro actualizado", {
          position: "top-right",
          duration: 2000,
        });
        return 2;
      }
    }
  } catch (error) {
    // console.log(error);
    if (error.status === 409) {
      console.log("hOLI");
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

const changeStatusPerson = async (id, data) => {
  try {
    console.log("ID => ", id, " DATA => ", { Activo: data });
    const response = await changeStatusURI(id, { Activo: data });
    console.log("changeStatusPerson => ", response);
  } catch (error) {
    // console.log(error);
    if (error.status === 409) {
      console.log("hOLI");
      toast.error(error.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
      return false;
    }
  }
};

export const usePersona = () => {
  return {
    findReniec,
    registerPerson,
    getPersona,
    getPersonaById,
    updatePerson,
    changeStatusPerson,
  };
};
