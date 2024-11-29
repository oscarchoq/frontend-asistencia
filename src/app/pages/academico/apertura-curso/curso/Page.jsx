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
import Loading from "@/components/custom/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurso } from "@/hook/useCurso";
import { columns } from "./columns";

const ListarCursos = ({ setCurso }) => {
  const [filterSemestre, setFilterSemestre] = useState("0");
  const [filterAsignatura, setFilterAsignatura] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursos, setCursos] = useState([]);

  const { getCursos } = useCurso();

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getCursos(filterSemestre, filterAsignatura);
      setCursos(res);
      setIsLoading(false);
    };

    if (filterAsignatura === "" || filterAsignatura.length >= 3) {
      get();
    }
  }, [filterAsignatura, filterSemestre]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-start  gap-x-3 gap-y-3 ">
        <div className="flex-shrink-0 space-y-2">
          <Label>Filtro semestre</Label>
          <Select
            value={filterSemestre}
            onValueChange={(value) => {
              // console.log("select", value);
              setFilterSemestre(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status - All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"0"}>TODOS</SelectItem>
                <SelectItem value={"1"}>PRIMERO</SelectItem>
                <SelectItem value={"2"}>SEGUNDO</SelectItem>
                <SelectItem value={"3"}>TERCERO</SelectItem>
                <SelectItem value={"4"}>CUARTO</SelectItem>
                <SelectItem value={"5"}>QUINTO</SelectItem>
                <SelectItem value={"6"}>SEXTO</SelectItem>
                <SelectItem value={"7"}>SEPTIMO</SelectItem>
                <SelectItem value={"8"}>OCTAVO</SelectItem>
                <SelectItem value={"9"}>NOVENO</SelectItem>
                <SelectItem value={"10"}>DECIMO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-grow  space-y-2">
          <Label>Buscador de asignatura</Label>
          <Input
            placeholder="Escriba 3 caracteres o más"
            value={filterAsignatura ?? ""}
            onChange={(event) => {
              setFilterAsignatura(event.target.value);
            }}
            className=""
          />
        </div>
      </div>

      <DataTable
        columns={columns({
          setData: setCurso,
        })}
        data={cursos}
        toolbar={false}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export { ListarCursos };
