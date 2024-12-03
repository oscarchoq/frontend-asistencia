import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useClase } from "@/hook/useClase";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AsistenciaManual = () => {
  const { id, claseID } = useParams();
  const [inscritos, setInscritos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAsistenciasById, marcarAsistencia } = useClase();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const res = await getAsistenciasById(claseID);
      console.log("res", res);
      setInscritos(res);
      setLoading(false);
    };

    get();
  }, []);

  const handleCheckboxChange = (studentId, estadoAsistencia) => {
    console.log("actuaalizar", inscritos);
    setInscritos((prevAsistencia) =>
      prevAsistencia.map(
        (item) =>
          item.EstudianteID === studentId
            ? { ...item, EstadoAsistencia: estadoAsistencia } // Actualiza el estado de asistencia
            : item // Deja el registro tal como está si no corresponde al estudiante
      )
    );
    console.log("actuaalizar fin", inscritos);
  };

  const onSubmit = async () => {
    console.log("mando esto -> ", inscritos);
    await marcarAsistencia(claseID, inscritos);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">SISTEMA DE INFORMACIÓN GERENCIAL</h1>
        <span className="text-gray-500 font-semibold mt-1">
          OLIVER ISRAEL SANTANA CARBAJAL
        </span>
      </div>

      <div className="flex flex-col">
        <span>Registro de asistencia </span>
        <span>14 de Octubre de 2024 </span>
      </div>

      <DataTable
        toolbar={false}
        data={inscritos}
        columns={columns({
          handleCheckboxChange,
        })}
        pagination={false}
      />

      <div className="w-full flex items-center justify-center">
        <Button onClick={onSubmit}>Guardar asistencia</Button>
      </div>
    </div>
  );
};

export { AsistenciaManual };
