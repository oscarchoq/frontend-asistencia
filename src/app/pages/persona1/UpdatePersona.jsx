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

import { useFetchCombos } from "@/hook/useFetchCombos";
import { usePersona } from "@/hook/usePersona";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { formSchema } from "./Schema";

const UpdatePersona = ({ type = 2, action = 1 }) => {
  // Combos
  const { fetchGradoInstruccion, fetchTipoDocumento, fetchEstadoCivil } =
    useFetchCombos();
  const [tipoDocs, setTipoDocs] = useState([]);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [gradosIns, setGradosIns] = useState([]);

  const { registerPerson, getPersonaById, updatePerson } = usePersona();
  const navigate = useNavigate();

  const { id } = useParams();
  const [person, setPerson] = useState(null);
  // / Formulario
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cod_matricula: "",
      tipo_doc_id: "",
      nro_documento: "",
      apellido_paterno: "",
      apellido_materno: "",
      nombres: "",
      sexo: "",
      nro_celular: "",
      correo_institucional: "",
      correo_personal: "",
      fecha_nacimiento: "",
      estado_civil: "",
      grado_instruccion: "",
    },
  });

  useEffect(() => {
    async function getCombos() {
      const combo1 = await fetchTipoDocumento();
      const combo2 = await fetchEstadoCivil();
      const combo3 = await fetchGradoInstruccion();
      const persona = await getPersonaById(id);

      setTipoDocs(combo1);
      setEstadoCivil(combo2);
      setGradosIns(combo3);
      setPerson(persona);
      if (persona) {
        console.log("Persona => ", persona);
        console.log("Person => ", person);
        console.log("Persona => ", persona.nombres);

        // form.reset({
        //   cod_matricula: "",
        //   tipo_doc_id: persona.tipo_doc_id,
        //   nro_documento: persona.nro_documento,
        //   apellido_paterno: persona.apellido_paterno,
        //   apellido_materno: persona.apellido_materno,
        //   nombres: persona.nombres,
        //   sexo: persona.sexo,
        //   nro_celular: persona.nro_celular || "",
        //   correo_institucional: persona.correo_institucional || "",
        //   correo_personal: persona.correo_personal || "",
        //   fecha_nacimiento: persona.fecha_nacimiento,
        //   estado_civil: persona.estado_civil,
        //   grado_instruccion: persona.grado_instruccion,
        // });
      }
    }
    getCombos();
  }, []);

  useEffect(() => {
    if (person) {
      console.log("Person => ", person.tipo_doc_id);
      form.reset({
        cod_matricula: person.cod_matricula || "",
        tipo_doc_id: person.tipo_doc_id,
        nro_documento: person.nro_documento,
        apellido_paterno: person.apellido_paterno,
        apellido_materno: person.apellido_materno,
        nombres: person.nombres,
        sexo: person.sexo,
        nro_celular: person.nro_celular || "",
        correo_institucional: person.correo_institucional || "",
        correo_personal: person.correo_personal || "",
        fecha_nacimiento: person.fecha_nacimiento,
        estado_civil: person.estado_civil_id,
        grado_instruccion: person.grado_instruccion_id,
      });
    }
  }, [person, form.reset]); // Se ejecuta cuando `person` cambia

  const onSubmit = async (data) => {
    console.log("Form => ", { ...data, type });
    const status = await updatePerson(id, data, type);
    if (status === 2 && type === 2) navigate("/estudiante");
  };

  return (
    <div>
      <div className="flex flex-col pb-8">
        <h1 className="font-bold text-xl">
          {action === 1 ? "Visualizar" : "Editar"} estudiante
        </h1>
        <span className="text-gray-500 font-semibold -mt-1">
          {action === 1
            ? "Visualiza los detalles del estudiante"
            : "Modifica todos los campos para quieras actualizar"}
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid gap-x-6 gap-y-2 grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="cod_matricula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cod. Matricula</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_doc_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Documento</FormLabel>
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tipoDocs.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nro_documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° Documento Registro</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Segunda Fila */}
            <FormField
              control={form.control}
              name="apellido_paterno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido_materno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Materno</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tercera Fila */}
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    disabled={action === 1 ? true : false}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">MASCULINO</SelectItem>
                      <SelectItem value="F">FEMENINO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha_nacimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Nacimiento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={action === 1 ? true : false}
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado_civil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select
                    disabled={action === 1 ? true : false}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {estadoCivil.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Cuarta Fila */}
            <FormField
              control={form.control}
              name="grado_instruccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grado de Instrucción</FormLabel>
                  <Select
                    disabled={action === 1 ? true : false}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el grado de instrucción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradosIns.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nro_celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo_institucional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Institucional</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo_personal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Personal</FormLabel>
                  <FormControl>
                    <Input disabled={action === 1 ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 justify-center py-6">
            {action === 2 && <Button type="submit">Actualizar</Button>}
            <Button
              type="button"
              variant="outline"
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

export default UpdatePersona;
