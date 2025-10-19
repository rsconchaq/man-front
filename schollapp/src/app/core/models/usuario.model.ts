// DTOs basados en el API backend
export interface UsuarioDto {
  IdUsuario?: number;
  LoginUsuario: string;
  LoginClave: string;
  Nombres: string;
  Apellidos: string;
  DescripcionReferencia?: string;
  IdReferencia?: number;
  Activo: number; // 1 = Activo, 0 = Inactivo
  IdRol: number;
  Rol?: RolDto;
  Menus?: MenuDto[];
}

export interface RolDto {
  IdRol: number;
  Activo: number;
  Descripcion: string;
}

export interface MenuDto {
  id?: string;
  parentId?: string;
  label?: string;
  link?: string;
  accion?: string;
  Activo?: number;
  subItems?: SubMenuDto[];
}

export interface SubMenuDto {
  id?: string;
  parentId?: string;
  label?: string;
  link?: string;
  accion?: string;
  Activo?: number;
}

export interface ResponseWrapperObject {
  success: boolean;
  message: string;
  additional?: string;
  data: any;
}

// Interfaces para el frontend (más fáciles de usar)
export interface Usuario {
  id?: number;
  loginUsuario: string;
  loginClave: string;
  nombres: string;
  apellidos: string;
  descripcionReferencia?: string;
  idReferencia?: number;
  activo: boolean;
  idRol: number;
  rol?: Rol;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface Rol {
  id: number;
  descripcion: string;
  activo: boolean;
}

export interface UsuarioResponse {
  success: boolean;
  message: string;
  data: Usuario | Usuario[];
  total?: number;
}

export interface UsuarioPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Mappers entre DTOs y modelos del frontend
export class UsuarioMapper {
  static toDto(usuario: Usuario): UsuarioDto {
    return {
      IdUsuario: usuario.id,
      LoginUsuario: usuario.loginUsuario,
      LoginClave: usuario.loginClave,
      Nombres: usuario.nombres,
      Apellidos: usuario.apellidos,
      DescripcionReferencia: usuario.descripcionReferencia,
      IdReferencia: usuario.idReferencia,
      Activo: usuario.activo ? 1 : 0,
      IdRol: usuario.idRol
    };
  }

  static fromDto(dto: UsuarioDto): Usuario {
    return {
      id: dto.IdUsuario,
      loginUsuario: dto.LoginUsuario,
      loginClave: dto.LoginClave,
      nombres: dto.Nombres,
      apellidos: dto.Apellidos,
      descripcionReferencia: dto.DescripcionReferencia,
      idReferencia: dto.IdReferencia,
      activo: dto.Activo === 1,
      idRol: dto.IdRol,
      rol: dto.Rol ? {
        id: dto.Rol.IdRol,
        descripcion: dto.Rol.Descripcion,
        activo: dto.Rol.Activo === 1
      } : undefined
    };
  }

  static fromResponse(response: ResponseWrapperObject): UsuarioResponse {
    let mappedData: Usuario | Usuario[];
    
    if (Array.isArray(response.data)) {
      mappedData = response.data.map((dto: UsuarioDto) => this.fromDto(dto));
    } else if (response.data) {
      mappedData = this.fromDto(response.data as UsuarioDto);
    } else {
      mappedData = [] as Usuario[]; // Default to empty array instead of null
    }

    return {
      success: response.success,
      message: response.message,
      data: mappedData
    };
  }

  static toResponse(usuarios: Usuario[] | Usuario, success: boolean = true, message: string = ''): UsuarioResponse {
    return {
      success,
      message,
      data: usuarios,
      total: Array.isArray(usuarios) ? usuarios.length : 1
    };
  }
}