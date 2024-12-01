import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import Loading from "@/components/custom/loading";

import { usePeriodo } from "@/hook/usePeriodo";
import FormPeriodo from "./FormPeriodo";
import { columns } from "./columns";

const ListarPeriodo = () => {
  const { getPeriodos, createPeriodo, updatePeriodo, changeStatus } =
    usePeriodo();
  const [periodos, setPeriodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectPeriodo, setSelectPeriodo] = useState(null);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getPeriodos();
      setPeriodos(res);
      setIsLoading(false);
    };
    get();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    let status = false;
    if (selectPeriodo === null) {
      status = await createPeriodo(data);
    } else {
      status = await updatePeriodo(selectPeriodo.PeriodoID, data);
    }
    if (status) {
      setPeriodos(await getPeriodos());
      setShowDialog(false);
      setIsLoading(false);
      setSelectPeriodo(null);
    }
    setIsLoading(false);
  };

  const handleChangeStatus = async (periodoID, newStatus) => {
    setIsLoading(true);
    const res = await changeStatus(periodoID, newStatus);
    if (res.status === 200) {
      const periodosFound = await getPeriodos();
      setPeriodos(periodosFound);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col pb-8 ">
        <h1 className="font-bold text-xl">Periodo Academico</h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Realice operaciones CRUD para los periodos academicos
        </span>
      </div>

      {/* Button and Table */}
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowDialog(true);
            setSelectPeriodo(null);
          }}
        >
          <Plus size={16} className="mr-2" />
          Nuevo
        </Button>
        <DataTable
          columns={columns({
            onStatusChange: handleChangeStatus,
            setShowDialog: setShowDialog,
            setData: setSelectPeriodo,
          })}
          data={periodos}
        />

        <Modal
          onSubmit={onSubmit}
          open={showDialog}
          close={setShowDialog}
          data={selectPeriodo}
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
            {data === null ? "Registrar" : "Actualizar"} Periodo Academico
          </DialogTitle>
          <DialogDescription>Completa los campos</DialogDescription>
        </DialogHeader>
        <FormPeriodo onSubmit={onSubmit} data={data} />
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit} form="form-periodo">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ListarPeriodo };
