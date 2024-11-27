import { z } from "zod";

export const AperturaSchema = z.object({
  Periodo: z.string().min(1, { message: "El periodo es obligatorio" }),
  Asignatura: z.string().min(1, { message: "La asignatura es obligatoria" }),
  Turno: z.string().min(1, { message: "El turno es obligatorio" }),
  Grupo: z.string().min(1, { message: "El grupo es obligatorio" }),
});
