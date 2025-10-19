export interface PermisoRol {
  idPermisos?: number;
  idRol?: number;
  activar?: boolean;
  Activo?: number;
  menu?: string;
  subMenu?: string;
}

export interface PermisoRolRequest {
  idPermisos?: number;
  idRol?: number;
  activar?: boolean;
  activo?: number;
}

export interface PermisoRolResponse {
  success: boolean;
  message: string;
  data: PermisoRol[];
  total?: number;
}

export interface ResponseWrapperObject {
  success: boolean;
  message: string;
  data: any;
  total?: number;
}

export class PermisoRolMapper {
  static fromResponse(response: ResponseWrapperObject): PermisoRolResponse {
    return {
      success: response?.success ?? false,
      message: response?.message ?? '',
      data: Array.isArray(response?.data) ? response.data.map(item => ({
        idPermisos: item.idPermisos,
        idRol: item.idRol,
        activar: item.activo === 1,
        activo: item.activo  ,
        menu: item.menu || '',
        subMenu: item.subMenu || ''
      })) : [],
      total: response?.total ?? 0
    };
  }

  static toRequest(permisoRol: PermisoRol): PermisoRolRequest {
    return {
      idPermisos: permisoRol.idPermisos,
      idRol: permisoRol.idRol,
      activar: permisoRol.activar ?? false,
      activo: permisoRol.Activo
    };
  }

  static fromDto(data: any): PermisoRol {
    return {
      idPermisos: data.idPermisos,
      idRol: data.idRol,
      activar: data.activar ?? false,
      Activo : data.activar ? 1 : 0,
      menu: data.menu || '',
      subMenu: data.subMenu || ''
    };
  }
}