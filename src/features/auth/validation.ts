import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "El ID de especialista o correo es obligatorio")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const PatientVerificationSchema = z.object({
  token: z
    .string()
    .min(1, "El token o código de acceso es obligatorio")
    .min(6, "El token o código de acceso es inválido"),
  birthYear: z
    .string()
    .min(1, "El año de nacimiento es obligatorio")
    .regex(/^\d{4}$/, "Debe ingresar un año de nacimiento válido de 4 dígitos"),
});

export type PatientVerificationInput = z.infer<typeof PatientVerificationSchema>;
