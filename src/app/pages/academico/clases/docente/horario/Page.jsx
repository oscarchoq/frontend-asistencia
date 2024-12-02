import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useClase } from "@/hook/useClase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormHorario from "./FormHorario";
import Loading from "@/components/custom/loading";

const ListarHorarios = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const [horarios, setHorarios] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectHorario, setSelectHorario] = useState(null);

  const { getHorarios, createHorario, updateHorario, changeStatusHorario } =
    useClase();

  useEffect(() => {
    async function get() {
      setLoading(true);
      const res = await getHorarios(id);
      setHorarios(res);
      setLoading(false);
    }
    get();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    let status = false;
    if (selectHorario === null) {
      status = await createHorario(id, data);
    } else {
      status = await updateHorario(selectHorario.HorarioID, data);
    }
    if (status) {
      setHorarios(await getHorarios(id));
      setShowDialog(false);
      setLoading(false);
      setSelectHorario(null);
    }
    setLoading(false);
  };

  const handleChangeStatus = async (horarioID, newStatus) => {
    // setIsLoading(true);
    setLoading(true);
    const res = await changeStatusHorario(horarioID, newStatus);
    if (res.status === 200) {
      setHorarios(await getHorarios(id));
    }
    setLoading(false);
  };

  return (
    <div className="sm:p-5 space-y-6">
      {loading && <Loading />}

      <div className="py-5">
        <h2>Lista de horarios registrados</h2>
      </div>

      <Button
        onClick={() => {
          setShowDialog(true);
          setSelectHorario(null);
        }}
      >
        <Plus size={16} className="mr-2" />
        Nuevo
      </Button>

      <DataTable
        toolbar={false}
        columns={columns({
          onStatusChange: handleChangeStatus,
          setShowDialog: setShowDialog,
          setData: setSelectHorario,
        })}
        data={horarios}
      />

      <Modal
        onSubmit={onSubmit}
        open={showDialog}
        close={setShowDialog}
        data={selectHorario}
      />
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
            {data === null ? "Registrar" : "Actualizar"} Horario
          </DialogTitle>
          <DialogDescription>Completa los campos</DialogDescription>
        </DialogHeader>
        <FormHorario onSubmit={onSubmit} data={data} />
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit} form="form-horario">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ListarHorarios };
