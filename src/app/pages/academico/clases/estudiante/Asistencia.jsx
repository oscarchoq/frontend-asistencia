import { Button } from "@/components/ui/button";
import useGeolocation from "@/hook/useGeolocalizacion";
import Charts from "./Charts";
import { useParams } from "react-router-dom";
import { useClase } from "@/hook/useClase";
import { useEffect, useState } from "react";

const AsistenciaEst = () => {
  const [details, setDetails] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
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

  const handleMarkAttendance = async () => {
    getGeolocation();
    if (location) {
      // Aquí guardarías la geolocalización en tu base de datos.
      console.log("Marcado de asistencia con coordenadas:", location);
      const status = await marcarAsistenciaGeo(id, location);
      console.log(status);
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
          disabled
          onClick={() => {
            // console.log("Marcar asistencia");
            handleMarkAttendance();
          }}
        >
          Marcar asistencia
        </Button>
      </div>
      <Charts data={details} />
    </div>
  );
};

export default AsistenciaEst;
