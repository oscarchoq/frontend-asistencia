import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(7, {
      message: "El nombre de usuario debe tener al menos 7 caracteres",
    })
    .max(11, {
      message: "El nombre de usuario debe tener como máximo 11 caracteres",
    }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(15, {
      message: "La contraseña debe tener como máximo 15 caracteres",
    }),
});
