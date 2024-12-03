import Loading from "@/components/custom/loading";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useClase } from "@/hook/useClase";
import FormAsistencia from "./FormAsistencia";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ListarAsistencias = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [asistencias, setAsistencias] = useState([]);

  const [selectAsistencia, setSelectAsistencia] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const { getAsistencias, createAsistencia, updateAsistencia } = useClase();

  useEffect(() => {
    async function get() {
      setLoading(true);
      const res = await getAsistencias(id);
      setAsistencias(res);
      setLoading(false);
    }
    get();
  }, []);

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    let status = false;
    if (selectAsistencia === null) {
      status = await createAsistencia(id, data);
    } else {
      status = await updateAsistencia(selectAsistencia.SesionID, data);
    }
    if (status) {
      setAsistencias(await getAsistencias(id));
      setShowDialog(false);
      setLoading(false);
      setSelectAsistencia(null);
    }
    setLoading(false);
  };

  return (
    <div className="sm:p-5 space-y-6">
      {loading && <Loading />}

      <div className="py-5">
        <h2>Listado de asistencias</h2>
      </div>

      <Button
        onClick={() => {
          setShowDialog(true);
          setSelectAsistencia(null);
        }}
      >
        <Plus size={16} className="mr-2" />
        Nuevo
      </Button>

      <DataTable
        toolbar={false}
        columns={columns({
          setShowDialog,
          setData: setSelectAsistencia,
        })}
        data={asistencias}
      />

      <Modal
        onSubmit={onSubmit}
        open={showDialog}
        close={setShowDialog}
        data={selectAsistencia}
      />
    </div>
  );
};

const Modal = ({ onSubmit, open, close, data }) => {
  return (
    <Dialog onOpenChange={close} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {data === null ? "Registrar" : "Actualizar"} Asistencia
          </DialogTitle>
          <DialogDescription>Completa los campos</DialogDescription>
        </DialogHeader>
        <FormAsistencia onSubmit={onSubmit} data={data} />
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit} form="form-asistencia">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ListarAsistencias };
