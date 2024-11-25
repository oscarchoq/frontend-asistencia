import { useForm } from "react-hook-form";
import { PeriodoSchema } from "./SchemaPeriodo";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormPeriodo = ({ onSubmit }) => {
  // Formulario
  const form = useForm({
    resolver: zodResolver(PeriodoSchema),
    defaultValues: {
      Anio: "",
      Ciclo: "",
      Denominacion: "",
      FechaInicio: "",
      FechaFin: "",
    },
  });

  // const onSubmit = async (data) => {
  //   console.log("data => ", data);
  // };

  return (
    <div>
      <Form {...form} id="form-periodo">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
          id="form-periodo"
        >
          <div className="grid gap-x-6 gap-y-2 grid-cols-1 ">
            {/* Apellido Paterno */}
            <FormField
              control={form.control}
              name="Anio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Año</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Ciclo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciclo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Denominacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Denominacion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <FormField
                control={form.control}
                name="FechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FechaFin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha Fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* <div className="flex gap-6 justify-center py-6">
            <Button type="submit">Guardar</Button>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </div> */}
        </form>
      </Form>
    </div>
  );
};

export default FormPeriodo;
