import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdContentPasteSearch } from "react-icons/md";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loading from "@/components/custom/loading";
import { useFetchCombos } from "@/hook/useFetchCombos";
import { periodoSort } from "@/lib/periodoSort";
import { ListarCursos } from "./curso/Page";
import { ListarDocentes } from "./docente/Page";
import { AperturaSchema } from "./SchemaApertura";

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
      Periodo: data !== null ? data.Periodo.toString() : "",
      Codigo: data !== null ? data.Codigo.toString() : "",
      Asignatura: data !== null ? data.Asignatura : "",
      Docente: data !== null ? data.Docente.toString() : "",
      Turno: data !== null ? data.Turno : "",
      Grupo: data !== null ? data.Grupo : "",
    },
  });

  const handleSelectCurso = (curso) => {
    setSelectCurso(curso);
    form.resetField("Asignatura", { defaultValue: curso.Denominacion });
    setShowCursos(false);
  };

  const handleSelectDocente = (docente) => {
    setSelectDocente(docente);
    form.setValue("Docente", docente.FullName);
    setShowDocentes(false);
  };

  const preOnSubmit = (data) => {
    const newData = {
      ...data,
      CursoID: selectCurso?.CursoID,
      DocenteID: selectDocente?.PersonaID,
    };
    onSubmit(newData);
  };

  useEffect(() => {
    async function getCombos() {
      setIsLoading(true);
      const combo1 = await fetchPeriodo();
      const orderedPeriodos = periodoSort(combo1);
      setPeriodos(orderedPeriodos);
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
                      className="ml-3 bg-sky-700 hover:bg-sky-900 text-white"
                      size="option"
                      type="button"
                      onClick={() => {
                        setShowCursos(true);
                        // console.log("curso seleccionado", selectCurso);
                      }}
                    >
                      <MdContentPasteSearch />
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
                      className="ml-3 bg-sky-700 hover:bg-sky-900 text-white"
                      size="option"
                      type="button"
                      onClick={() => {
                        setShowDocentes(true);
                        // console.log("docente seleccionado", selectDocente);
                      }}
                    >
                      <MdOutlinePersonSearch />
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      {...field}
                      value={selectDocente?.FullName || ""}
                    />
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
        type="curso"
      />

      <Modal
        open={showDocentes}
        onClose={setShowDocentes}
        setDocente={handleSelectDocente}
        type="docente"
      />
    </div>
  );
};

const Modal = ({ open, onClose, setCurso, setDocente, type }) => {
  // const handleSelectCurso = (curso) => {
  //   console.log("curso a cargar", curso);
  //   setCurso(curso); // Actualiza el estado local
  //   // form.setValue("Asignatura", curso.Denominacion); // Actualiza el formulario
  //   // onClose(false); // Cierra el modal
  // };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Seleccionar {type === "curso" ? "asignatura" : "docente"}
          </DialogTitle>
        </DialogHeader>
        {type === "curso" && <ListarCursos setCurso={setCurso} />}
        {type === "docente" && <ListarDocentes setDocente={setDocente} />}
      </DialogContent>
    </Dialog>
  );
};

export default FormApertura;
