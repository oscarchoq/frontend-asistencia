import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ListarEstudiantes } from "./estudiante/Page";
import { ListarDocentes } from "./docente/Page";

const HomePersona = ({ typePerson }) => {
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
        <Link to={"registrar"}>
          <Button>
            <Plus size={16} className="mr-2" />
            Nuevo
          </Button>
        </Link>

        {typePerson === 1 ? <ListarEstudiantes /> : <ListarDocentes />}
      </div>
    </div>
  );
};

export default HomePersona;
