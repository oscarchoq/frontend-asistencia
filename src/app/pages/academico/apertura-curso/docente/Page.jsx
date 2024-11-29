import Loading from "@/components/custom/loading";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { usePersona } from "@/hook/usePersona";

const ListarDocentes = ({ setDocente }) => {
  const [filterDocente, setFilterDocente] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docentes, setDocentes] = useState([]);

  const { getPersona } = usePersona();

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getPersona(2);
      setDocentes(res);
      setIsLoading(false);
    };

    if (filterDocente === "" || filterDocente.length >= 3) {
      get();
    }
  }, [filterDocente]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-start  gap-x-3 gap-y-3 ">
        <div className="flex-grow space-y-2">
          <Label>Buscador de docente por nombre o número de documento</Label>
          <Input
            placeholder="Escriba 3 caracteres o más"
            value={filterDocente ?? ""}
            onChange={(event) => {
              setFilterDocente(event.target.value);
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns({
          setData: setDocente,
        })}
        data={docentes}
        toolbar={false}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export { ListarDocentes };
