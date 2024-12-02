import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClase } from "@/hook/useClase";
import { columns } from "./columns";

const Estudiantes = ({ id }) => {
  const [filterEstado, setFilterEstado] = useState("ACEPTADO");
  const [filterCodigo, setFilterCodigo] = useState("");

  const [inscritos, setInscritos] = useState([]);

  const { getInscritos, changeStatusInscripcion } = useClase();

  useEffect(() => {
    const get = async () => {
      const res = await getInscritos(id, filterEstado, filterCodigo);
      // console.log("res", res);
      setInscritos(res);
    };

    if (filterCodigo === "" || filterCodigo.length >= 3) {
      get();
    }
  }, [filterEstado, filterCodigo]);

  const onStatusChange = async (InscripcionID, newStatus) => {
    const res = await changeStatusInscripcion(InscripcionID, newStatus);
    if (res.status === 200) {
      setInscritos(await getInscritos(id, filterEstado, filterCodigo));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-start  gap-x-3 gap-y-3 ">
        <div className="flex-shrink-0 space-y-2">
          <Label>Filtro estado</Label>
          <Select
            value={filterEstado}
            onValueChange={(value) => {
              // console.log("select", value);
              setFilterEstado(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="TODOS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"TODOS"}>TODOS</SelectItem>
                <SelectItem value={"ACEPTADO"}>ACEPTADO</SelectItem>
                <SelectItem value={"EN ESPERA"}>EN ESPERA</SelectItem>
                <SelectItem value={"RECHAZADO"}>RECHAZADO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-grow  space-y-2">
          <Label>Buscador por código</Label>
          <Input
            placeholder="Escriba 3 caracteres o más"
            value={filterCodigo ?? ""}
            onChange={(event) => {
              setFilterCodigo(event.target.value);
            }}
            className=""
          />
        </div>
      </div>

      <DataTable
        columns={columns({
          onStatusChange,
        })}
        data={inscritos}
        toolbar={false}
      />
    </div>
  );
};

export { Estudiantes };
