import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaCopy } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClase } from "@/hook/useClase";
import { toast } from "sonner";
import { ListarHorarios } from "./horario/Page";
import { Estudiantes } from "./matricula/Page";
import Loading from "@/components/custom/loading";
import { ListarAsistencias } from "./asistencia/Page";
const ClaseDocente = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [clase, setClase] = useState(null);
  const { getClase, changeAutoAprobacion } = useClase();

  useEffect(() => {
    async function get() {
      setLoading(true);
      const response = await getClase(id);
      if (!response) {
        navigate("/404");
        setLoading(false);
      }
      setClase(response);
      setLoading(false);
    }
    get();
  }, []);

  const handleSwitchChange = async (value) => {
    setLoading(true);
    const res = await changeAutoAprobacion(id, clase?.AprobacionAutomatica);
    if (res.status === 200) {
      setClase(await getClase(id));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {loading && <Loading />}

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
              <Switch
                checked={clase?.AprobacionAutomatica}
                onCheckedChange={() => setShowDialog(true)}
              />
            </div>
          </div>
          <div className="flex items-center justify-start space-x-3">
            <p className="text-sm font-medium text-muted-foreground">
              Código de clase:
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <Input
                value={clase?.CodigoApertura || ""}
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
      <Tabs defaultValue="asistencia" className="">
        <TabsList>
          <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="horarios">Horarios</TabsTrigger>
        </TabsList>
        <TabsContent value="asistencia">
          <ListarAsistencias id={id} />
        </TabsContent>
        <TabsContent value="estudiantes">
          <Estudiantes id={id} />
        </TabsContent>
        <TabsContent value="horarios">
          <ListarHorarios id={id} />
        </TabsContent>
      </Tabs>

      {/* Dialog */}
      <AlertDialog1
        open={showDialog}
        onClose={setShowDialog}
        autoAprobacion={clase?.AprobacionAutomatica}
        handleConfirmChange={handleSwitchChange}
      />
    </div>
  );
};

const AlertDialog1 = ({
  open,
  onClose,
  autoAprobacion,
  handleConfirmChange,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {autoAprobacion
              ? "¿Estás seguro de desactivar la aprobación automática?"
              : "¿Estás seguro de activar la aprobación automática?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {autoAprobacion
              ? "Si desactivas la aprobación automática, los estudiantes deberán ser aprobados manualmente para ingresar a la clase. ¿Deseas continuar?"
              : "Si activas la aprobación automática, cualquier estudiante con el código podrá ingresar automáticamente a la clase. ¿Deseas continuar?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmChange}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ClaseDocente };
