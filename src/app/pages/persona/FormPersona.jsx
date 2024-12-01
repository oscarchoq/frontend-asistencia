import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { formSchemaEstudiante } from "./estudiante/SchemaEstudiante";
import { formSchemaDocente } from "./docente/SchemaDocente";
import FormSkeleton from "./FormSkeleton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchCombos } from "@/hook/useFetchCombos";
import { usePersona } from "@/hook/usePersona";

// typeForm: 1 = registrar, 2 = editar
// typePerson: 1 = estudiante, 2 = profesor
const FormPersona = ({ typeForm = 2, typePerson = 1 }) => {
  // Start -- Combos
  const { fetchGradoInstruccion, fetchTipoDocumento, fetchEstadoCivil } =
    useFetchCombos();
  const [tipoDocs, setTipoDocs] = useState([]);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [gradosIns, setGradosIns] = useState([]);
  // End -- Combos

  const [selectTipoDoc, setSelectTipoDoc] = useState(1);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [person, setPerson] = useState(null);

  const { findReniec, registerPerson, getPersonaById, updatePerson } =
    usePersona();

  // React Hook Form
  const navigate = useNavigate();
  const { id } = useParams();

  // Formulario
  const form = useForm({
    resolver: zodResolver(
      typePerson === 1 ? formSchemaEstudiante : formSchemaDocente
    ),
    defaultValues: {
      Codigo: "",
      TipoDocID: "",
      NumeroDocumento: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      Nombres: "",
      Sexo: "",
      NumeroCelular: "",
      NumeroCelular2: "",
      CorreoInstitucional: "",
      CorreoPersonal: "",
      FechaNacimiento: "",
      EstadoCivilID: "",
      GradoInstruccionID: "",
    },
  });

  // Traer combos
  useEffect(() => {
    async function getCombos() {
      const combo1 = await fetchTipoDocumento();
      const combo2 = await fetchEstadoCivil();
      const combo3 = await fetchGradoInstruccion();

      setTipoDocs(combo1);
      setEstadoCivil(combo2);
      setGradosIns(combo3);

      // console.log(combo1);
      // console.log(combo2);
      // console.log(combo3);
    }
    getCombos();
  }, []);

  // Obtener informacion de la persona con id
  useEffect(() => {
    async function getPerson() {
      if (id) {
        const persona = await getPersonaById(id, typePerson);
        // console.log("existe", persona);
        setPerson(persona);

        // Convierte los ID a string
        const tipoDocID = persona?.TipoDocID
          ? persona.TipoDocID.toString()
          : "";
        const EstadoCivilID = persona?.EstadoCivilID
          ? persona.EstadoCivilID.toString()
          : "";
        const GradoInstruccionID = persona?.GradoInstruccionID
          ? persona.GradoInstruccionID.toString()
          : "";

        // Cuando los datos de `persona` estén disponibles, actualizamos el formulario
        form.reset({
          Codigo: persona?.Codigo || "",
          TipoDocID: tipoDocID,
          NumeroDocumento: persona?.NumeroDocumento || "",
          ApellidoPaterno: persona?.ApellidoPaterno || "",
          ApellidoMaterno: persona?.ApellidoMaterno || "",
          Nombres: persona?.Nombres || "",
          Sexo: persona?.Sexo || "",
          NumeroCelular: persona?.NumeroCelular || "",
          NumeroCelular2: persona?.NumeroCelular2 || "",
          CorreoInstitucional: persona?.CorreoInstitucional || "",
          CorreoPersonal: persona?.CorreoPersonal || "",
          FechaNacimiento: persona?.FechaNacimiento || "",
          EstadoCivilID: EstadoCivilID,
          GradoInstruccionID: GradoInstruccionID,
        });
      }
    }

    getPerson();
  }, [id]); // Re-ejecuta cuando `id` o `form` cambian

  const onSubmit = async (data) => {
    // console.log(data);
    setLoadingSubmit(true);
    // Insert de estudiante
    if (typeForm === 1 && typePerson === 1) {
      const status = await registerPerson(typePerson, data);
      if (status && typePerson === 1) navigate("/estudiante");
    }

    // Update de estudiante
    if (typeForm === 2 && typePerson === 1) {
      // console.log("UDP DATA EST => ", data);
      const status = await updatePerson(typePerson, id, data);
      // console.log("status desde el form => ", status);
      if (status === 2 && typePerson === 1) navigate("/estudiante");
    }

    // Insert de docente
    if (typeForm === 1 && typePerson === 2) {
      // console.log("INS DOCENTE => ", data);
      const status = await registerPerson(typePerson, data);
      // console.log("STATUS DOc => ", status);
      if (status && typePerson === 2) navigate("/docente");
    }

    // Update de docente
    if (typeForm === 2 && typePerson === 2) {
      // console.log("UDP DATA DOC => ", data);
      const status = await updatePerson(typePerson, id, data);
      // console.log("status desde el form => ", status);
      if (status === 2 && typePerson === 2) navigate("/docente");
    }
    setLoadingSubmit(false);
  };

  const searchReniec = async (dni) => {
    setLoadingBtn(true);
    const { resultado } = await findReniec(dni);
    setLoadingBtn(false);
    form.setValue("ApellidoPaterno", resultado.apellido_paterno);
    form.setValue("ApellidoMaterno", resultado.apellido_materno);
    form.setValue("Nombres", resultado.nombres);
  };

  if (!person && typeForm === 2) return <FormSkeleton />;
  return (
    <div>
      <div className="flex flex-col pb-8">
        <h1 className="font-bold text-xl">
          Formulario para {typePerson === 1 ? "Estudiante" : "Docente"}
        </h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Complete todos los campos para{" "}
          {typeForm === 1 ? "registrar" : "actualizar"} un{" "}
          {typePerson === 1 ? "estudiante" : "docente"}
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid gap-x-6 gap-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Tipo documento */}
            <FormField
              control={form.control}
              name="TipoDocID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Documento</FormLabel>
                  <Select
                    disabled={typeForm === 2 ? true : false}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectTipoDoc(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tipoDocs.map((item) => (
                        <SelectItem
                          key={item.TipoDocID}
                          value={item.TipoDocID.toString()}
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

            {/* Numero de documento */}
            <FormField
              control={form.control}
              name="NumeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° Documento</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        disabled={typeForm === 2 ? true : false}
                        {...field}
                      />
                    </FormControl>
                    {selectTipoDoc === "1" && (
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={loadingBtn}
                        onClick={() => {
                          if (!field.value) {
                            toast.warning("No hay número de documento", {
                              position: "top-right",
                              duration: 2000,
                            });
                            return;
                          }
                          if (!/^\d{8}$/.test(field.value)) {
                            toast.warning("Número de documento no válido", {
                              position: "top-right",
                              duration: 2000,
                            });
                            return;
                          }
                          searchReniec(field.value);
                        }}
                      >
                        {loadingBtn === false ? (
                          <>
                            <Search size={18} className="mr-2" />
                            Buscar RENIEC
                          </>
                        ) : (
                          <>
                            <Loader2 size={18} className="animate-spin mr-2" />
                            Buscando
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Codigo de estudiante / docente */}
            {typeForm === 1 && typePerson === 2 ? (
              <div></div>
            ) : (
              <FormField
                control={form.control}
                name="Codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cod. Matricula</FormLabel>
                    <FormControl>
                      <Input
                        disabled={
                          typeForm === 2 && typePerson === 2 ? true : false
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Segunda Fila */}

            {/* Apellido Paterno */}
            <FormField
              control={form.control}
              name="ApellidoPaterno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Apellido Materno */}
            <FormField
              control={form.control}
              name="ApellidoMaterno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Materno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nombres */}
            <FormField
              control={form.control}
              name="Nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tercera Fila */}

            {/* Sexo */}
            <FormField
              control={form.control}
              name="Sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MASCULINO">MASCULINO</SelectItem>
                      <SelectItem value="FEMENINO">FEMENINO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha Nacimiento */}
            <FormField
              control={form.control}
              name="FechaNacimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado civil */}
            <FormField
              control={form.control}
              name="EstadoCivilID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {estadoCivil.map((item) => (
                        <SelectItem
                          key={item.EstadoCivilID}
                          value={item.EstadoCivilID.toString()}
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

            {/* Cuarta Fila */}

            {/* Grado de instruccion */}
            <FormField
              control={form.control}
              name="GradoInstruccionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grado de Instrucción</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el grado de instrucción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradosIns.map((item) => (
                        <SelectItem
                          key={item.GradoInstruccionID}
                          value={item.GradoInstruccionID.toString()}
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

            {/* Celular */}
            <FormField
              control={form.control}
              name="NumeroCelular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Celular 2 */}
            <FormField
              control={form.control}
              name="NumeroCelular2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular 2 (opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quinta Fila */}

            {/* Correo Institucional */}
            <FormField
              control={form.control}
              name="CorreoInstitucional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Institucional</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Correo Personal */}
            <FormField
              control={form.control}
              name="CorreoPersonal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Personal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 justify-center py-6">
            <Button type="submit" disabled={loadingSubmit}>
              {loadingSubmit === true ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Cargando
                </>
              ) : (
                <>{typeForm === 1 ? "Registrar" : "Actualizar"}</>
              )}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormPersona;
