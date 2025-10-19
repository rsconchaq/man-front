export interface Docente {
  idDocente?: number;
  codigo: string;
  documentoIdentidad: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: string;
  gradoEstudio?: string;
  ciudad?: string;
  direccion?: string;
  email?: string;
  numeroTelefonico?: string;
  estado?: string;
}
