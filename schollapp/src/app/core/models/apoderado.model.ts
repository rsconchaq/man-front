export interface Apoderado {
  idApoderado?: number;
  documentoIdentidad: string;
  nombres: string;
  apellidos: string;
  tipoRelacion: string;
  telefono1: string;
  telefono2?: string;
  correo?: string;
}
