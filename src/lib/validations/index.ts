import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "profesional", "paciente"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const DniSchema = z
  .string()
  .min(8, "El documento debe tener al menos 8 caracteres")
  .max(12, "El documento no puede exceder 12 caracteres");

export const BirthYearSchema = z
  .string()
  .regex(/^\d{4}$/, "El año debe tener exactamente 4 dígitos")
  .refine((val) => {
    const year = parseInt(val, 10);
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear;
  }, "Año de nacimiento no válido");
