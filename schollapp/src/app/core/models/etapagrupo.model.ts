export interface EtapaGrupo {
  id: number;
  nombre: string;
  localId: number;
  etapaId: number;
  activo: boolean;
  menu?: string;
  submenu?: string;
  // Agrega otros campos según el api-doc.json
}
