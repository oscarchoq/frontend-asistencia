import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGeolocation = () => {
  const [permissionStatus, setPermissionStatus] = useState("prompt"); // Estado inicial
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      // setError("La geolocalización no es compatible con este navegador.");
      toast.error("La geolocalización no es compatible con este navegador.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null); // Limpia errores previos
      },
      (err) => {
        let errorMSG = "";
        if (err.code === 1) {
          setError("Permiso de geolocalización denegado.");
          errorMSG = "Permiso de geolocalización denegado.";
        } else if (err.code === 2) {
          setError("No se pudo determinar la ubicación.");
          errorMSG = "No se pudo determinar la ubicación.";
        } else if (err.code === 3) {
          setError("El tiempo de espera para obtener la ubicación se agotó.");
          errorMSG = "El tiempo de espera para obtener la ubicación se agotó.";
        } else {
          setError("Error desconocido al obtener la geolocalización.");
          errorMSG = "Error desconocido al obtener la geolocalización.";
        }

        toast.error(errorMSG, {
          position: "top-right",
          duration: 2000,
        });
      }
    );
  };

  // Verificar permisos al montar el componente
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation",
        });
        setPermissionStatus(result.state);

        // Escuchar cambios en permisos
        result.onchange = () => {
          setPermissionStatus(result.state);
          if (result.state === "granted") {
            getGeolocation(); // Obtener ubicación automáticamente si los permisos cambian
          }
        };
      } catch {
        console.warn("La Permission API no es compatible en este navegador.");
      }
    };

    checkPermissions();
  }, []);

  return { permissionStatus, location, error, getGeolocation };
};

export default useGeolocation;
