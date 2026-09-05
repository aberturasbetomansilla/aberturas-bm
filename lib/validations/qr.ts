import { z } from "zod"

const httpsUrl = z
  .string()
  .trim()
  .min(1, "Ingresá una URL")
  .url("Ingresá una URL válida")
  .refine((value) => value.startsWith("https://"), {
    message: "La URL debe comenzar con https://",
  })

export const qrConfigureSchema = z.object({
  business_name: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre del negocio")
    .max(120, "El nombre es demasiado largo"),
  destination_url: httpsUrl,
})

export const qrEditSchema = qrConfigureSchema
  .extend({
    status: z.enum(["available", "active", "inactive"]),
  })
  .refine(
    (data) =>
      data.status !== "active" ||
      (data.business_name.length > 0 && data.destination_url.length > 0),
    {
      message: "Un QR activo necesita nombre del negocio y URL",
      path: ["status"],
    },
  )

export type QRConfigureInput = z.infer<typeof qrConfigureSchema>
export type QREditInput = z.infer<typeof qrEditSchema>
