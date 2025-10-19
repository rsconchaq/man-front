// DTOs basados en el API backend
export interface RolDto {
  IdRol?: number;
  Activo: number; // 1 = Activo, 0 = Inactivo
  Descripcion: string;
}

export interface ResponseWrapperObject {
  success: boolean;
  message: string;
  additional?: string;
  data: any;
}

// Interfaces para el frontend (más fáciles de usar)
export interface Rol {
  IdRol?: number;
  Descripcion: string;
  Activo: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface RolResponse {
  success: boolean;
  message: string;
  data: Rol | Rol[];
  total?: number;
}

export interface RolPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Mappers entre DTOs y modelos del frontend
export class RolMapper {
  static toDto(rol: Rol): RolDto {
    return {
      IdRol: rol.IdRol,
      Descripcion: rol.Descripcion,
      Activo: rol.Activo ? 1 : 0
    };
  }

  static fromDto(dto: RolDto): Rol {
    return {
      IdRol: dto.IdRol,
      Descripcion: dto.Descripcion,
      Activo: dto.Activo === 1
    };
  }

  static fromResponse(response: ResponseWrapperObject): RolResponse {
    let mappedData: Rol | Rol[];
    
    if (Array.isArray(response.data)) {
      mappedData = response.data.map((dto: RolDto) => this.fromDto(dto));
    } else if (response.data) {
      mappedData = this.fromDto(response.data as RolDto);
    } else {
      mappedData = [] as Rol[]; // Default to empty array instead of null
    }

    return {
      success: response.success,
      message: response.message,
      data: mappedData
    };
  }

  static toResponse(roles: Rol[] | Rol, success: boolean = true, message: string = ''): RolResponse {
    return {
      success,
      message,
      data: roles,
      total: Array.isArray(roles) ? roles.length : 1
    };
  }
}