import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import Loading from "@/components/custom/loading";
import { useFetchCombos } from "@/hook/useFetchCombos";
import { useApertura } from "@/hook/useApertura";
import { periodoSort } from "@/lib/periodoSort";
import { columns } from "./columns";
import FormApertura from "./FormApertura";

const Page = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectApertura, setSelectApertura] = useState(null);

  const { fetchPeriodo } = useFetchCombos();
  const [periodos, setPeriodos] = useState([]);

  const { getAperturas, createApertura, updateApertura } = useApertura();
  const [aperturas, setAperturas] = useState([]);
  const [filterPeriodo, setFilterPeriodo] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    let status = false;

    if (selectApertura === null) {
      status = await createApertura(data);
    } else {
      status = await updateApertura(selectApertura.AperturaCursoID, data);
    }
    if (status) {
      setAperturas(await getAperturas(filterPeriodo));
      setShowDialog(false);
      setIsLoading(false);
      setSelectApertura(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function getCombos() {
      setIsLoading(true);
      const combo1 = await fetchPeriodo();
      const orderedPeriodos = periodoSort(combo1);
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
          Realice operaciones CRUD para aperturar cursos
        </span>
      </div>

      {/* Button and Table */}
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowDialog(true);
            setSelectApertura(null);
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
                  // console.log("select", value);
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
        <DataTable
          columns={columns({
            setShowDialog,
            setData: setSelectApertura,
          })}
          data={aperturas}
          toolbar={false}
        />

        <Modal
          onSubmit={onSubmit}
          open={showDialog}
          close={setShowDialog}
          data={selectApertura}
        />
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

const Modal = ({ onSubmit, open, close, data }) => {
  // console.log("update => ", data);
  return (
    <Dialog onOpenChange={close} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {data === null ? "Aperturar curso" : "Actualizar"}
          </DialogTitle>
        </DialogHeader>
        <FormApertura onSubmit={onSubmit} data={data} />
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit} form="form-apertura">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
