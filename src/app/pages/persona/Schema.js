import { number, z } from "zod";

export const formSchema = z
  .object({
    cod_matricula: z
      .string({
        message: "Campo obligatorio",
      })
      .refine((val) => /^[0-9]{4}-[0-9]{6}$/.test(val), {
        message: "Código de matrícula no es válido",
      }),
    tipo_doc_id: z.string({
      message: "Campo obligatorio",
    }),
    nro_documento: z
      .string({
        message: "Campo obligatorio",
      })
      .max(12, {
        message: "Numero de documento no es válido",
      }),
    apellido_paterno: z
      .string({
        message: "Campo obligatorio",
      })
      .min(3)
      .max(50),
    apellido_materno: z
      .string({
        message: "Campo obligatorio",
      })
      .min(3)
      .max(50),
    nombres: z
      .string({
        message: "Campo obligatorio",
      })
      .min(3)
      .max(100),
    sexo: z.enum(["M", "F"], {
      message: "Campo obligatorio",
    }),
    nro_celular: z.string().min(9).max(12).optional(""),
    correo_institucional: z.string().email().optional(""),
    correo_personal: z.string().email().optional(""),
    fecha_nacimiento: z.string(),
    estado_civil: z.string({
      message: "Campo obligatorio",
    }),
    grado_instruccion: z.string({
      message: "Campo obligatorio",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.tipo_doc_id === "1" || data.tipo_doc_id === 1) {
      if (data.nro_documento.length > 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El DNI debe tener como máximo 8 caracteres",
          path: ["nro_documento"],
        });
      } else if (!/^\d+$/.test(data.nro_documento)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El DNI debe ser numérico",
          path: ["nro_documento"],
        });
      }
    }
  });
