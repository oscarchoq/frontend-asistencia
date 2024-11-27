import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLastfm, FaLastfmSquare, FaSearch } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AperturaSchema } from "./SchemaApertura";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListarCursos } from "../curso/Page";
import { usePeriodo } from "@/hook/usePeriodo";
import { useFetchCombos } from "@/hook/useFetchCombos";
import Loading from "@/components/custom/loading";

const FormApertura = ({ onSubmit, data = null }) => {
  const [showCursos, setShowCursos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCurso, setSelectCurso] = useState(null);

  const [showDocentes, setShowDocentes] = useState(false);
  const [selectDocente, setSelectDocente] = useState(null);

  const [periodos, setPeriodos] = useState([]);
  const { fetchPeriodo } = useFetchCombos();

  const form = useForm({
    resolver: zodResolver(AperturaSchema),
    defaultValues: {
      Periodo: data !== null ? data.Ciclo.toString() : "",
      Codigo: data !== null ? data.Ciclo.toString() : "",
      Asignatura: data !== null ? data.Denominacion : "",
      Docente: data !== null ? data.Anio.toString() : "",
      Turno: data !== null ? data.FechaInicio : "",
      Grupo: data !== null ? data.FechaFin : "",
    },
  });

  const handleSelectCurso = (curso) => {
    console.log("curso a cargar", curso);
    setSelectCurso(curso);
    form.setValue("Asignatura", curso.Denominacion);
    setShowCursos(false);
  };

  const preOnSubmit = (data) => {
    console.log("data sin procesar", data);
    const newData = {
      ...data,
      CursoID: selectCurso?.CursoID,
      DocenteID: selectDocente?.DocenteID,
    };
    onSubmit(newData);
  };

  useEffect(() => {
    async function getCombos() {
      setIsLoading(true);
      const combo1 = await fetchPeriodo();
      console.log("periodos", combo1);
      setPeriodos(combo1);
      setIsLoading(false);
    }
    getCombos();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}

      <Form {...form} id="form-apertura">
        <form onSubmit={form.handleSubmit(preOnSubmit)} id="form-apertura">
          <div className="grid gap-x-6 gap-y-2">
            {/* Periodo */}
            <FormField
              control={form.control}
              name="Periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periodo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Periodo" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Asignatura */}
            <FormField
              control={form.control}
              name="Asignatura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Asignatura
                    <Button
                      className="ml-3 bg-slate-600 dark:bg-slate-300"
                      size="option"
                      type="button"
                      onClick={() => {
                        setShowCursos(true);
                        console.log("curso seleccionado", selectCurso);
                      }}
                    >
                      <FaSearch />
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      {...field}
                      value={selectCurso?.Denominacion || ""} // Mostrar el curso seleccionado
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Docente */}
            <FormField
              control={form.control}
              name="Docente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Docente
                    <Button
                      className="ml-3 bg-slate-600 dark:bg-slate-300"
                      size="option"
                      type="button"
                    >
                      <FaSearch />
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Turno */}
            <FormField
              control={form.control}
              name="Turno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turno</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Turno" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">MAÑANA</SelectItem>
                      <SelectItem value="T">TARDE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Grupo */}
            <FormField
              control={form.control}
              name="Grupo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">GRUPO A</SelectItem>
                      <SelectItem value="B">GRUPO B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <Modal
        open={showCursos}
        onClose={setShowCursos}
        setCurso={handleSelectCurso}
      />
    </div>
  );
};

const Modal = ({ open, onClose, setCurso, setDocente }) => {
  // const handleSelectCurso = (curso) => {
  //   console.log("curso a cargar", curso);
  //   setCurso(curso); // Actualiza el estado local
  //   // form.setValue("Asignatura", curso.Denominacion); // Actualiza el formulario
  //   // onClose(false); // Cierra el modal
  // };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Seleccionar asignatura</DialogTitle>
        </DialogHeader>
        <ListarCursos setCurso={setCurso} />
      </DialogContent>
    </Dialog>
  );
};

export default FormApertura;
