import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./Schema";
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
import { useEffect, useState } from "react";
import { useFetchCombos } from "@/hook/useFetchCombos";
import { Button } from "@/components/ui/button";
import { usePersona } from "@/hook/usePersona";
import { useNavigate } from "react-router-dom";

const FormPersona = ({ type = 2 }) => {
  // Combos
  const { fetchGradoInstruccion, fetchTipoDocumento, fetchEstadoCivil } =
    useFetchCombos();
  const [tipoDocs, setTipoDocs] = useState([]);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [gradosIns, setGradosIns] = useState([]);

  const { registerPerson } = usePersona();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCombos() {
      const combo1 = await fetchTipoDocumento();
      const combo2 = await fetchEstadoCivil();
      const combo3 = await fetchGradoInstruccion();

      setTipoDocs(combo1);
      setEstadoCivil(combo2);
      setGradosIns(combo3);
    }
    getCombos();
  }, []);

  // Formulario
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Form => ", { ...data, type });
    const status = registerPerson(data, type);
    if (status && type === 2) navigate("/estudiante");
  };

  return (
    <div>
      <div className="flex flex-col pb-8">
        <h1 className="font-bold text-xl">Registro de estudiante</h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Complete todos los campos para registrar un estudiante
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
                    <Input {...field} />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                    <Input type="date" {...field} />
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 justify-center py-6">
            <Button type="submit">Registrar</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormPersona;
