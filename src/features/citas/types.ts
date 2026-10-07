export interface SolicitudCitaInput {
  nombre: string;
  telefono: string;
  afeccion: string;
  sede?: string;
  turno?: string;
  mensaje?: string;
  origen?: "modal" | "landing_sede" | "web";
}

export interface SolicitudCitaResult {
  success: boolean;
  id?: string;
  whatsappUrl?: string;
  error?: string;
  message?: string;
}
