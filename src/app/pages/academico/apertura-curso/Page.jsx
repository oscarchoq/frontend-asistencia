import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

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

const Page = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createApertura } = useApertura();

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
