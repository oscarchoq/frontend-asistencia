import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Inscripcion = ({ onSubmit }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [codigo, setCodigo] = useState("");

  // const onSubmit = async () => {
  //   setIsDisabled(true);
  //   console.log(codigo);
  //   const status = await inscribirse(codigo);
  //   console.log("res form", res);
  //   if (status) {
  //     setIsDisabled(false);
  //   }
  //   setIsDisabled(false);
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCodigo(value);
    if (/^[a-zA-Z0-9]{6}$/.test(value)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-4">
        <span>Pidele a tu profesor el código de clase e introdúcelo aquí.</span>
        <Input
          type="text"
          value={codigo}
          onChange={handleInputChange}
          placeholder="Ingrese el código de la clase"
        />
        <span className="flex justify-center text-xs text-gray-500">
          <FaCircleInfo size={20} className="mr-3" />
          Usa un código de clase con 6 letras o números, sin espacios ni
          símbolos.
        </span>
        <div className="flex justify-end">
          <Button variant="ghost">Cancelar</Button>
          <Button
            disabled={isDisabled}
            onClick={() => onSubmit(codigo)}
            variant="ghost"
            className="text-primary hover:text-primary"
          >
            Unirme
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Inscripcion };
