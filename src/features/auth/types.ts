import type { Database } from "@/types/database";

export type UserRole = Database["public"]["Enums"]["user_role_type"];

export type UserProfile = Database["public"]["Tables"]["perfiles_usuarios"]["Row"];

export interface AuthSessionUser {
  id: string;
  email?: string | null;
  profile: UserProfile;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export interface PatientVerificationResult {
  valid: boolean;
  error?: string;
  paciente_id?: string;
}
