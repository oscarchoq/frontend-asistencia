import { z } from "zod";

export const PeriodoSchema = z.object({
  Anio: z
    .string()
    .min(4, { message: "El año debe tener 4 caracteres" })
    .max(4, { message: "El año debe tener 4 caracteres" }),
  Ciclo: z.enum(["1", "2"], { message: "El ciclo debe ser 1 o 2" }),
  Denominacion: z.string(),
  FechaInicio: z
    .string()
    .min(1, { message: "La fecha de inicio es obligatoria" }),
  FechaFin: z.string().min(1, { message: "La fecha de fin es obligatoria" }),
});
