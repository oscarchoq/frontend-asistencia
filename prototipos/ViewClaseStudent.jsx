import { Link } from "react-router-dom";
import { Charts } from "./Charts";
import { Button } from "@/components/ui/button";
const ViewClaseStudent = () => {
  return (
    <div>
      <div className="flex flex-col pb-8">
        <h1 className="font-bold text-xl">SISTEMA DE INFORMACIÓN GERENCIAL</h1>
        <span className="text-gray-500 font-semibold mt-1">
          OLIVER ISRAEL SANTANA CARBAJAL
        </span>
      </div>

      <Button>
        <Link to={"/clasesest/marcar"}>Marcar asistencia</Link>
      </Button>

      <div className="py-8">
        <Charts />
      </div>
    </div>
  );
};

export default ViewClaseStudent;
