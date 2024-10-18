import {
  getStudentById,
  getStudents,
  registerStudent,
  updateStudent,
} from "@/api/persona";
import { toast } from "sonner";

const registerPerson = async (person, type) => {
  try {
    if (type === 2) {
      // Estudiante
      const response = await registerStudent({ ...person, tipo_pers_id: type });
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 2000,
        });
        return True;
      }
    }

    if (type === 3) {
      // Docente
    }
  } catch (error) {}
};
const getPersona = async (type = 2) => {
  try {
    const response = await getStudents();
    // console.log(response.data);
    return response.data;
  } catch (error) {}
};
const getPersonaById = async (id) => {
  try {
    const response = await getStudentById(id);
    console.log(response.data);
    return response.data;
  } catch (error) {}
};

const updatePerson = async (id, person, type = 2) => {
  try {
    if (type === 2) {
      // Estudiante
      const response = await updateStudent(id, {
        ...person,
        tipo_pers_id: type,
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

    if (type === 3) {
      // Docente
    }
  } catch (error) {}
};

export const usePersona = () => {
  return {
    registerPerson,
    getPersona,
    getPersonaById,
    updatePerson,
  };
};
