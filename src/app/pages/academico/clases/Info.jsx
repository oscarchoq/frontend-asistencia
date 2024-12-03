import { Button } from "@/components/ui/button";
import React from "react";
import Charts from "./estudiante/Charts";

const Info = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">NOMBRE DE CURSO</h1>
        <span className="text-foreground font-semibold mt-1">
          NOMBRE DOCENTE
        </span>
      </div>

      <Button onClick={() => console.log("Marcar asistencia")}>
        Marcar asistencia
      </Button>

      <Charts />
    </div>
  );
};

export default Info;
