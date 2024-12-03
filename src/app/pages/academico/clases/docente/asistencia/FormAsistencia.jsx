import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AsistenciaSchema } from "./SchemaAsistencia";

const FormAsistencia = ({ onSubmit, data = null }) => {
  const form = useForm({
    resolver: zodResolver(AsistenciaSchema),
    defaultValues: {
      FechaSesion: data !== null ? data.FechaSesion : "",
      DiaSemana: data !== null ? data.DiaSemana : "",
      HoraInicio: data !== null ? data.HoraInicio : "",
      HoraFin: data !== null ? data.HoraFin : "",
      Tolerancia: data !== null ? data.Tolerancia || "" : "",
      TipoClase: data !== null ? data.TipoClase : "",
    },
  });
  return (
    <div>
      <Form {...form} id="form-asistencia">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
          id="form-asistencia"
        >
          <div className="grid gap-x-6 gap-y-2 grid-cols-1 ">
            <FormField
              control={form.control}
              name="FechaSesion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de sesion</FormLabel>
                  <FormControl>
                    <Input className="w-full" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <FormField
                control={form.control}
                name="DiaSemana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia de la semana</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el dia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LUNES">LUNES</SelectItem>
                        <SelectItem value="MARTES">MARTES</SelectItem>
                        <SelectItem value="MIERCOLES">MIERCOLES</SelectItem>
                        <SelectItem value="JUEVES">JUEVES</SelectItem>
                        <SelectItem value="VIERNES">VIERNES</SelectItem>
                        <SelectItem value="SABADO">SABADO</SelectItem>
                        <SelectItem value="DOMINGO">DOMINGO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TipoClase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de clase</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la clase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TEORICO">TEORICO</SelectItem>
                        <SelectItem value="PRACTICO">PRACTICO</SelectItem>
                        <SelectItem value="LABORATORIO">LABORATORIO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
              <FormField
                control={form.control}
                name="HoraInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora Inicio</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="HoraFin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora Fin</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Tolerancia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tolerancia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormAsistencia;
