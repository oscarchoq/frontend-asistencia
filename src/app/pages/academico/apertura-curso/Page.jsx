import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormApertura from "./FormApertura";
import { useApertura } from "@/hook/useApertura";
import Loading from "@/components/custom/loading";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFetchCombos } from "@/hook/useFetchCombos";

const Page = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchPeriodo } = useFetchCombos();
  const [periodos, setPeriodos] = useState([]);

  const { createApertura, getAperturas } = useApertura();
  const [aperturas, setAperturas] = useState([]);
  const [filterPeriodo, setFilterPeriodo] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    let status = false;
    console.log("mmmm", data);
    status = await createApertura(data);
    if (status) {
      setShowDialog(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getCombos() {
      setIsLoading(true);
      const combo1 = await fetchPeriodo();
      console.log("periodos", combo1);

      // Ordenamos los periodos por año y semestre
      const orderedPeriodos = combo1.sort((a, b) => {
        const [aYear, aPeriod] = a.Denominacion.split("-").map(Number);
        const [bYear, bPeriod] = b.Denominacion.split("-").map(Number);
        if (aYear !== bYear) {
          return bYear - aYear;
        }
        return bPeriod - aPeriod;
      });

      setPeriodos(orderedPeriodos);

      // Seleccionamos por defecto el último periodo
      if (orderedPeriodos.length > 0) {
        setFilterPeriodo(orderedPeriodos[0].PeriodoID.toString());
      }

      setIsLoading(false);
    }
    getCombos();
  }, []);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      console.log("Traer las aperturas");
      const res = await getAperturas(filterPeriodo);
      setAperturas(res);
      setIsLoading(false);
    };

    if (filterPeriodo) {
      get();
    }
  }, [filterPeriodo]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col pb-8 ">
        <h1 className="font-bold text-xl">Apertura de Curso</h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Realice operaciones CRUD para los periodos academicos
        </span>
      </div>

      {/* Button and Table */}
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <Plus size={16} className="mr-2" />
          Nuevo
        </Button>

        <div>
          <div className="flex flex-wrap items-center justify-start  gap-x-3 gap-y-3 ">
            <div className="flex-shrink-0">
              <Label>Filtro periodo</Label>
              <Select
                value={filterPeriodo}
                onValueChange={(value) => {
                  console.log("select", value);
                  setFilterPeriodo(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status - All" />
                </SelectTrigger>
                <SelectContent>
                  {periodos?.map((item) => (
                    <SelectItem
                      key={item.PeriodoID}
                      value={item.PeriodoID.toString()}
                    >
                      {item.Denominacion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={aperturas} toolbar={false} />

        <Modal onSubmit={onSubmit} open={showDialog} close={setShowDialog} />
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

const Modal = ({ onSubmit, open, close, data = null }) => {
  console.log("update => ", data);
  return (
    <Dialog onOpenChange={close} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {data === null ? "Registrar" : "Actualizar"} Periodo Academico
          </DialogTitle>
        </DialogHeader>
        <FormApertura onSubmit={onSubmit} data={data} />
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit} form="form-apertura">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
