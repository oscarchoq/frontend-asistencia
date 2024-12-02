import { z } from "zod";

export const HorarioSchema = z.object({
  DiaSemana: z.string().min(1, { message: "El campo es obligatorio" }),
  HoraInicio: z.string().min(1, { message: "El campo es obligatorio" }),
  HoraFin: z.string().min(1, { message: "El campo es obligatorio" }),
  Tolerancia: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)), // Convierte solo si hay un valor válido.
    z
      .number({ invalid_type_error: "Debe ser un número" })
      .nonnegative({ message: "Debe ser un número positivo" })
      .optional() // Permite que sea opcional después de la conversión.
  ),
  TipoClase: z.string().min(1, { message: "El campo es obligatorio" }),
});
