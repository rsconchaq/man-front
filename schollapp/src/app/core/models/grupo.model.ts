// DTOs basados en el API backend (grupo-controller)
export interface GrupoDto {
  idGrupo?: string;
  descripcionGrupo: string;
  descripcion?: string;
  edad1:number;
  edad2:number;
  activo?: number;
  asignado?: boolean;
  usuarioRegistro?: string;
  fechaRegistro?: string;
  usuarioActualizacion?: string;
  fechaActualizacion?: string;
  listaTaller?: any[];
  idEtapa?: string;
}

// Modelo para uso interno de la aplicación
export interface Grupo {
  idGrupo?: string;
  descripcionGrupo: string;
  descripcion?: string;
  edad1:number;
  edad2:number;
  activo: string;
  asignado?: boolean;
  usuarioRegistro?: string;
  fechaRegistro?: Date;
  usuarioActualizacion?: string;
  fechaActualizacion?: Date;
}

export interface GrupoResponse {
  success: boolean;
  message: string;
  data: Grupo | Grupo[];
  total?: number;
}

/**
 * Mapper para convertir entre DTOs y modelos internos
 */
export class GrupoMapper {
  /**
   * Convierte GrupoDto a Grupo
   */
  static fromDto(dto: GrupoDto): Grupo {
    return {
      idGrupo: dto.idGrupo||'0',
      descripcionGrupo: dto.descripcionGrupo,
      descripcion: dto.descripcion,
      edad1: dto.edad1,
      edad2: dto.edad2,
      activo: dto.activo ? "true" : "false",
      asignado: dto.asignado ?? false,
      usuarioRegistro: dto.usuarioRegistro,
      fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : new Date(),
      usuarioActualizacion: dto.usuarioActualizacion,
      fechaActualizacion: dto.fechaActualizacion ? new Date(dto.fechaActualizacion) : undefined
    };
  }

  /**
   * Convierte Grupo a GrupoDto
   */
  static toDto(grupo: Grupo): GrupoDto {
    return {
      idGrupo: grupo.idGrupo||'0',
      descripcionGrupo: grupo.descripcionGrupo,
      descripcion: grupo.descripcion,
      edad1: grupo.edad1,
      edad2: grupo.edad2,
      activo: grupo.activo ? 1 : 0,
      asignado: grupo.asignado,
      usuarioRegistro: grupo.usuarioRegistro,
      fechaRegistro: grupo.fechaRegistro?.toISOString(),
      usuarioActualizacion: grupo.usuarioActualizacion,
      fechaActualizacion: grupo.fechaActualizacion?.toISOString()
    };
  }

  /**
   * Convierte respuesta del API a GrupoResponse
   */
  static fromResponse(apiResponse: any): GrupoResponse {
    console.log('Procesando respuesta del API:', apiResponse);
    
    if (!apiResponse) {
      return {
        success: false,
        message: 'No se recibió respuesta del servidor',
        data: []
      };
    }

    // Si la respuesta directamente es un array (sin wrapper)
    if (Array.isArray(apiResponse)) {
      return {
        success: true,
        message: 'Datos cargados correctamente',
        data: apiResponse.map((dto: GrupoDto) => GrupoMapper.fromDto(dto)),
        total: apiResponse.length
      };
    }

    // Si es una respuesta con estructura standard (ResponseWrapperObject)
    if (apiResponse.data) {
      // Si data es un array de DTOs
      if (Array.isArray(apiResponse.data)) {
        return {
          success: apiResponse.estado !== false,
          message: apiResponse.mensaje || 'Datos cargados correctamente',
          data: apiResponse.data.map((dto: GrupoDto) => GrupoMapper.fromDto(dto)),
          total: apiResponse.total || apiResponse.data.length
        };
      }
      
      // Si data es un solo DTO
      return {
        success: apiResponse.estado !== false,
        message: apiResponse.mensaje || 'Dato cargado correctamente',
        data: GrupoMapper.fromDto(apiResponse.data)
      };
    }

    // Si no tiene data pero tiene success y message
    return {
      success: apiResponse.estado || false,
      message: apiResponse.mensaje || 'Respuesta vacía del servidor',
      data: []
    };
  }
}