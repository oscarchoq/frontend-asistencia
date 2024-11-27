import { getCursosURI } from "@/api/academico";
import { toast } from "sonner";

const getCursos = async (semestre, search) => {
  try {
    const response = await getCursosURI(
      semestre === "0" ? "" : semestre,
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

export const useCurso = () => {
  return {
    getCursos,
  };
};
