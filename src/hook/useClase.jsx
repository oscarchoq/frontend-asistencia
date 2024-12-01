import { getClasesURI, inscribirseURI } from "@/api/academico";
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

export const useClase = () => {
  return {
    inscribirse,
    getClases,
  };
};
