import { createAperturaURI } from "@/api/academico";
import { toast } from "sonner";

const createApertura = async (apertura) => {
  try {
    const response = await createAperturaURI(apertura);
    console.log("response apertura => ", response);
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

export const useApertura = () => {
  return {
    createApertura,
  };
};
