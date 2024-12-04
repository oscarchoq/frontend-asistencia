import { Button } from "@/components/ui/button";
import useGeolocation from "@/hook/useGeolocalizacion";
import Charts from "./Charts";
import { useParams } from "react-router-dom";
import { useClase } from "@/hook/useClase";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormOTP from "./FormOTP";
import { toast } from "sonner";

const AsistenciaEst = () => {
  const [details, setDetails] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [showCodeOTP, setShowCodeOTP] = useState(false);

  const { id } = useParams();
  // console.log("id", id);

  const { getAsistenciaGeo, marcarAsistenciaGeo } = useClase();

  useEffect(() => {
    const get = async () => {
      const res = await getAsistenciaGeo(id);
      // console.log(res);
      setDetails(res);
    };
    get();
  }, [id]);

  const { permissionStatus, location, error, getGeolocation } =
    useGeolocation();

  const handleMarkAttendance = async (value, location) => {
    if (!/^\d{6}$/.test(value)) {
      console.log("El valor no es un número o no tiene 6 dígitos");
      toast.warning("Formato de código no válido.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    // getGeolocation();
    // if (location) {
    //   // Aquí guardarías la geolocalización en tu base de datos.
    //   console.log("Marcado de asistencia con coordenadas:", location);
    //   const status = await marcarAsistenciaGeo(id, location);
    //   console.log(status);
    // }
    // console.log("Quiero marcar asistencia", value);
    const status = await marcarAsistenciaGeo(id, {
      CodigoSesion: value,
      Latitud: location.latitude,
      Longitud: location.longitude,
    });
    if (status) {
      setDetails(await getAsistenciaGeo(id));
      setShowCodeOTP(false);
    }
  };

  useEffect(() => {
    if (location && !hasLocation) {
      // Si la localización ha cambiado, actualizamos el estado
      setHasLocation(true);
      console.log("Marcado de asistencia con coordenadas:", location);
      // Aquí guardarías la geolocalización en tu base de datos.
    }
  }, [location, hasLocation]); // Solo se ejecuta si la localización cambia

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">{details?.NombreCurso}</h1>
        <span className="text-foreground font-semibold mt-1">
          {details?.NombreDocente}
        </span>
      </div>

      <div className="">
        {permissionStatus !== "granted" && (
          <span className="flex py-2">No tienes permisos de GPS activado</span>
        )}

        <Button
          // disabled={permissionStatus !== "granted"}
          // disabled
          onClick={() => {
            setShowCodeOTP(true);
          }}
        >
          Marcar asistencia
        </Button>
      </div>
      <Charts data={details} />

      <Modal
        open={showCodeOTP}
        onClose={setShowCodeOTP}
        onSubmit={handleMarkAttendance}
      />
    </div>
  );
};

const Modal = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Marcar Asistencia</DialogTitle>
        </DialogHeader>
        <FormOTP onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AsistenciaEst;
