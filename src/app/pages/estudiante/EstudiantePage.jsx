import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EstudiantePage = () => {
  return (
    <div>
      <div className="flex flex-col pb-8">
        <h1 className="font-bold text-xl">Estudiantes</h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Realice operaciones CRUD para los estudiantes
        </span>
      </div>

      <div className="pb-8">
        <Button>
          <Link to={"registrar"}>Nuevo</Link>
        </Button>
      </div>
    </div>
  );
};

export default EstudiantePage;
