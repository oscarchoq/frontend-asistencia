import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

const FormOTP = ({ onSubmit, onClose }) => {
  const [value, setValue] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      function (error) {
        console.log("Error getting location: ", error);
        // Alert.error("Error al obtener su ubicación, intente nuevamente.");
      },
      {
        enableHighAccuracy: true,
      }
    );
  });

  return (
    <div className="space-y-6">
      {/* <h1>GEO</h1>
      <p>latitude: {location.latitude}</p>
      <p>longitude: {location.longitude}</p> */}
      {location.longitude === 0 && location.longitude === 0 && (
        <p>Verifica que los permisos de GPS esten activados.</p>
      )}

      {location.longitude !== 0 && location.longitude !== 0 && (
        <div className="space-y-6">
          <div className="text-sm">
            Por favor, ingrese el codigo de clase generada por su docente.
            {/* <p className="flex items-center hover:underline cursor-pointer pt-2 text-slate-600">
          Prefiero scanear QR
        </p> */}
          </div>
          <div className="flex items-center justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center text-sm">
            {value === "" ? <>Ingrese su código de clase.</> : <></>}
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => onClose(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => onSubmit(value, location)}
              variant="ghost"
              className="text-primary hover:text-primary"
            >
              Marcar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormOTP;
