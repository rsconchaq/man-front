// DTOs basados en el API backend (según api-doc.json)
export interface TallerDto {
  idTaller?: number;
  descripcion: string;
  activo: number; // 1 = Activo, 0 = Inactivo
  asignado?: number; // 1 = Asignado, 0 = No asignado
  usuarioRegistro?: string;
  fechaRegistro?: string; // formato ISO string
  usuarioActualizacion?: string;
  fechaActualizacion?: string; // formato ISO string
  idEtapa?: number;
  idGrupo?: number;
}

// Modelo para uso interno de la aplicación
export interface Taller {
  id?: number;
  descripcion: string;
  activo: boolean;
  asignado?: boolean;
  usuarioRegistro?: string;
  fechaRegistro?: Date;
  usuarioActualizacion?: string;
  fechaActualizacion?: Date;
  etapaId?: number;
  grupoId?: number;
  etapa?: {
    id?: number;
    descripcion?: string;
  };
  grupo?: {
    id?: number;
    descripcion?: string;
  };
}

export interface TallerResponse {
  success: boolean;
  message: string;
  data: any | any[];
  total?: number;
}

export interface TallerPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Mapper para convertir entre DTOs y modelos internos
 */
export class TallerMapper {
  /**
   * Convierte TallerDto a Taller
   */
  static fromDto(dto: TallerDto): Taller {
    return {
      id: dto.idTaller,
      descripcion: dto.descripcion,
      activo: dto.activo === 1,
      asignado: dto.asignado === 1,
      usuarioRegistro: dto.usuarioRegistro,
      fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : undefined,
      usuarioActualizacion: dto.usuarioActualizacion,
      fechaActualizacion: dto.fechaActualizacion ? new Date(dto.fechaActualizacion) : undefined,
      etapaId: dto.idEtapa,
      grupoId: dto.idGrupo
    };
  }

  /**
   * Convierte Taller a TallerDto
   */
  static toDto(taller: Taller): TallerDto {
    return {
      idTaller: taller.id,
      descripcion: taller.descripcion,
      activo: taller.activo ? 1 : 0,
      asignado: taller.asignado ? 1 : 0,
      usuarioRegistro: taller.usuarioRegistro,
      fechaRegistro: taller.fechaRegistro?.toISOString(),
      usuarioActualizacion: taller.usuarioActualizacion,
      fechaActualizacion: taller.fechaActualizacion?.toISOString(),
      idEtapa: taller.etapaId,
      idGrupo: taller.grupoId
    };
  }

  /**
   * Convierte respuesta del API a TallerResponse
   */
  static fromResponse(apiResponse: any): TallerResponse {
    console.log('TallerMapper: Procesando respuesta del API:', apiResponse);
    
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
        data: apiResponse.map((dto: TallerDto) => TallerMapper.fromDto(dto)),
        total: apiResponse.length
      };
    }

    // Manejar ResponseWrapperObject del API
    if (apiResponse.data !== undefined) {
      // Si data es un array de DTOs
      if (Array.isArray(apiResponse.data)) {
        return {
          success: apiResponse.success !== false,
          message: apiResponse.message || 'Datos cargados correctamente',
          data: apiResponse.data.map((dto: TallerDto) => TallerMapper.fromDto(dto)),
          total: apiResponse.total || apiResponse.data.length
        };
      }
      
      // Si data es un solo DTO
      if (apiResponse.data) {
        return {
          success: apiResponse.success !== false,
          message: apiResponse.message || 'Dato cargado correctamente',
          data: TallerMapper.fromDto(apiResponse.data)
        };
      }
    }

    // Si no tiene data pero tiene success y message (operaciones CRUD)
    return {
      success: apiResponse.success || false,
      message: apiResponse.message || 'Operación completada',
      data: []
    };
  }
}