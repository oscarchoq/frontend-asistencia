import { number, z } from "zod";

export const formSchemaDocente = z
  .object({
    Codigo: z.string({
      message: "Campo obligatorio",
    }),
    TipoDocID: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      }),
    NumeroDocumento: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      })
      .min(8, {
        message: "Numero de documento debe ser igual o mayor a 8 caracteres",
      })
      .max(12, {
        message: "Numero de documento no es válido",
      }),
    ApellidoPaterno: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      })
      .max(50),
    ApellidoMaterno: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      })
      .max(50),
    Nombres: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      })
      .max(100),
    Sexo: z.enum(["MASCULINO", "FEMENINO"], {
      message: "Campo obligatorio",
    }),
    NumeroCelular: z
      .string()
      .min(9, {
        message: "El celular tiene minimo 9 caracteres",
      })
      .max(12, {
        message: "El celular tiene máximo 12 caracteres",
      })
      .refine((value) => /^[0-9]*$/.test(value), {
        message: "El número debe ser numerico.",
      })
      .optional()
      .or(z.literal("")),
    NumeroCelular2: z
      .string()
      .min(9, {
        message: "El celular tiene minimo 9 caracteres",
      })
      .max(12, {
        message: "El celular tiene máximo 12 caracteres",
      })
      .refine((value) => /^[0-9]*$/.test(value), {
        message: "El número debe ser numerico.",
      })
      .optional()
      .or(z.literal("")),
    CorreoInstitucional: z
      .string({
        message: "Campo obligatorio",
      })
      .email({
        message: "El correo institucional debe ser un email",
      })
      .optional()
      .or(z.literal("")),
    CorreoPersonal: z
      .string()
      .email({
        message: "El correo personal debe ser un email",
      })
      .optional()
      .or(z.literal("")),
    FechaNacimiento: z.string(),
    EstadoCivilID: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      }),
    GradoInstruccionID: z
      .string({
        message: "Campo obligatorio",
      })
      .min(1, {
        message: "Campo obligatorio",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.TipoDocID === "1" || data.TipoDocID === 1) {
      if (data.NumeroDocumento.length > 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El DNI debe tener como máximo 8 caracteres",
          path: ["NumeroDocumento"],
        });
      } else if (!/^\d+$/.test(data.NumeroDocumento)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El DNI debe ser numérico",
          path: ["NumeroDocumento"],
        });
      }
    }
  });
