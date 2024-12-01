import { useState } from "react";
import { ArrowRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClase } from "@/hook/useClase";
import { Inscripcion } from "./Inscripcion";
import Loading from "@/components/custom/loading";

const ClasePage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { inscribirse } = useClase();

  const onSubmit = async (codigo) => {
    setLoading(true);
    const status = await inscribirse(codigo);
    if (status) {
      //volver a cargar cursos
      setLoading(false);
      setShowDialog(false);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => setShowDialog(true)}>Unirse a clase</Button>
      {/* Listado de clases */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <div>
            <img
              src="https://img.freepik.com/foto-gratis/plano-escritorio-oficina-estetica_23-2148219266.jpg"
              alt="/nombrecurso"
              className="aspect-[19/8] md:aspect-[16/9] size-full object-cover object-center rounded-t-[0.5rem]"
            />
          </div>
          <CardContent className="p-6 md:h-32">
            <h1 className="text-lg font-semibold">NOMBRE DE CURSO</h1>
          </CardContent>
          <CardFooter className="">
            <div className="flex flex-col w-full space-y-6">
              <p className="text-muted-foreground text-sm">NOMBRE DOCENTE</p>
              <Button className="w-full bg-sky-700 hover:bg-sky-600">
                Ir al curso
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Modal open={showDialog} onClose={setShowDialog} onSubmit={onSubmit} />

      {loading && <Loading />}
    </div>
  );
};

const Modal = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Unirse a clase</DialogTitle>
        </DialogHeader>
        <Inscripcion onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ClasePage;
