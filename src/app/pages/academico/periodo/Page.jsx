import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormPeriodo from "./FormPeriodo";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { usePeriodo } from "@/hook/usePeriodo";
import Loading from "@/components/custom/loading";

const ListarPeriodo = () => {
  const { getPeriodos, changeStatus } = usePeriodo();
  const [periodos, setPeriodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getPeriodos();
      // console.log("res", res);
      setPeriodos(res);
      setIsLoading(false);
    };
    get();
  }, []);

  const onSubmit = async (data) => {
    console.log("data => ", data);
  };

  const handleChangeStatus = async (periodoID, newStatus) => {
    setIsLoading(true);
    const res = await changeStatus(periodoID, newStatus);
    // console.log(res);
    if (res.status === 200) {
      const periodosFound = await getPeriodos();
      setPeriodos(periodosFound);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Periodo Academico</DialogTitle>
            <DialogDescription>Completa los campos</DialogDescription>
          </DialogHeader>
          <FormPeriodo onSubmit={onSubmit} />
          <DialogFooter>
            <Button type="submit" onSubmit={onSubmit} form="form-periodo">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columns({ onStatusChange: handleChangeStatus })}
        data={periodos}
      />

      {isLoading && <Loading />}
    </div>
  );
};

export { ListarPeriodo };
