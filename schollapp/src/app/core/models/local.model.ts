// DTOs basados en el API backend
export interface LocalDto {
  idLocal?: number;
  descripcion: string;
  direccion: string;
  activo: number; // 1 = Activo, 0 = Inactivo
}

// Modelo para uso interno de la aplicación
export interface Local {
  id?: number;
  descripcion: string;
  direccion: string;
  activo: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface LocalResponse {
  success: boolean;
  message: string;
  data: Local | Local[];
  total?: number;
}

export interface LocalPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Mapper para convertir entre DTOs y modelos internos
 */
export class LocalMapper {
  /**
   * Convierte LocalDto a Local
   */
  static fromDto(dto: LocalDto): Local {
    return {
      id: dto.idLocal,
      descripcion: dto.descripcion,
      direccion: dto.direccion,
      activo: dto.activo === 1
    };
  }

  /**
   * Convierte Local a LocalDto
   */
  static toDto(local: Local): LocalDto {
    return {
      idLocal: local.id,
      descripcion: local.descripcion,
      direccion: local.direccion,
      activo: local.activo ? 1 : 0
    };
  }

  /**
   * Convierte respuesta del API a LocalResponse
   */
  static fromResponse(apiResponse: any): LocalResponse {
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
        data: apiResponse.map((dto: LocalDto) => LocalMapper.fromDto(dto)),
        total: apiResponse.length
      };
    }

    // Si es una respuesta con estructura standard
    if (apiResponse.data) {
      // Si data es un array de DTOs
      if (Array.isArray(apiResponse.data)) {
        return {
          success: apiResponse.success !== false, // Por defecto true si no está definido
          message: apiResponse.message || 'Datos cargados correctamente',
          data: apiResponse.data.map((dto: LocalDto) => LocalMapper.fromDto(dto)),
          total: apiResponse.total || apiResponse.data.length
        };
      }
      
      // Si data es un solo DTO
      return {
        success: apiResponse.success !== false,
        message: apiResponse.message || 'Dato cargado correctamente',
        data: LocalMapper.fromDto(apiResponse.data)
      };
    }

    // Si no tiene data pero tiene success y message
    return {
      success: apiResponse.success || false,
      message: apiResponse.message || 'Respuesta vacía del servidor',
      data: []
    };
  }
}