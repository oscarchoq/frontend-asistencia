import { registerStudent } from "@/api/persona";
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
const getPersona = async () => {};
const getPersonaById = async () => {};

export const usePersona = () => {
  return {
    registerPerson,
    getPersona,
    getPersonaById,
  };
};
