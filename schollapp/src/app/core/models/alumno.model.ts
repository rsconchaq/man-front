export interface Alumno {
  idAlumno?: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  fechaNacimiento: string;
  sexo: string;
  ciudad: string;
  direccion: string;
  edad?: number;
  diagnostico?: string;
  observacion?: string;
  apoderadoPrincipal?: import('./apoderado.model').Apoderado;
  apoderadoSecundario?: import('./apoderado.model').Apoderado;
  apoderados?: import('./apoderado.model').Apoderado[];
}
