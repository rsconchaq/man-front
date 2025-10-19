export interface AperturaTaller {
  idApertura: number;
  nombreTaller: string;
  local: string;
  etapa: string;
  grupo: string;
  aula: string;
  vacantesTotal: number;
  vacantesDisponibles: number;
  diaSemana: string;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  descripcionTaller?: string;
  // Agrega otros campos según el api-doc.json
}
