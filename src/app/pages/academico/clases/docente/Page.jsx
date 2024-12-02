import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Asistencia from "./Asistencia";
import Estudiantes from "./Estudiantes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaCopy } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClase } from "@/hook/useClase";
import { toast } from "sonner";
const ClaseDocente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clase, setClase] = useState(null);
  const { getClase } = useClase();

  useEffect(() => {
    async function get() {
      const response = await getClase(id);
      console.log(response);
      if (!response) {
        navigate("/404");
      }
      setClase(response);
    }
    get();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-y-5">
        <div className="flex flex-col sm:col-span-2">
          <h1 className="font-bold text-xl">{clase?.Asignatura}</h1>
          <span className="text-gray-500 font-semibold mt-1">
            {clase?.Docente || "Sin docente asignado"}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-start space-x-3">
            <p className="text-sm font-medium text-muted-foreground">
              Aprobación automática:
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <Switch />
            </div>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <p className="text-sm font-medium text-muted-foreground">
              Código de clase:
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <Input
                value={clase?.CodigoApertura}
                disabled
                className="flex-grow max-w-32 disabled:opacity-100 text-right"
              />
              <Button
                variant=""
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(clase?.CodigoApertura);
                  toast.success("Código copiado", {
                    position: "top-right",
                    duration: 2000,
                  });
                }}
              >
                <FaCopy />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="asistencia" className="w-[500px]">
        <TabsList>
          <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="horarios">Horarios</TabsTrigger>
        </TabsList>
        <TabsContent value="asistencia">
          <Asistencia />
        </TabsContent>
        <TabsContent value="estudiantes">
          <Estudiantes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ClaseDocente };
