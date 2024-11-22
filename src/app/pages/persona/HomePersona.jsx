import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ListarEstudiantes } from "./estudiante/Page";
import { ListarDocentes } from "./docente/Page";

const HomePersona = ({ typePerson = 1 }) => {
  // typePerson: 1 ESTUDIANTE; 2 DOCENTE
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col pb-8 ">
        <h1 className="font-bold text-xl">
          {typePerson === 1 ? "Estudiantes" : "Docentes"}
        </h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Realice operaciones CRUD para los{" "}
          {typePerson === 1 ? "estudiantes" : "docentes"}
        </span>
      </div>

      {/* Button and Table */}
      <div className="space-y-6">
        <Button>
          <Link
            to={"registrar"}
            className="flex items-center justify-center pr-1"
          >
            <Plus size={16} className="mr-2" />
            Nuevo
          </Link>
        </Button>

        {typePerson === 1 ? <ListarEstudiantes /> : <ListarDocentes />}
      </div>
    </div>
  );
};

export default HomePersona;
