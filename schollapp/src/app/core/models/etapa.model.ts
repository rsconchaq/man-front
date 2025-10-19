// DTOs basados en el API backend (según api-doc.json)
export interface EtapaDto {
  idEtapa?: number;
  local?: {
    idLocal: number;
    descripcion?: string;
    direccion?: string;
    activo?: number;
  };
  descripcionEtapa: string;
  descripcion: string;
  activo: number; // 1 = Activo, 0 = Inactivo
  usuarioRegistro?: string;
  fechaRegistro?: string; // formato ISO string
  usuarioActualizacion?: string;
  fechaActualizacion?: string; // formato ISO string
}

// Modelo para uso interno de la aplicación
export interface Etapa {
  id?: number;
  localId?: number;
  local?: {
    id?: number;
    descripcion?: string;
    direccion?: string;
    activo?: boolean;
  };
  descripcionEtapa: string;
  descripcion: string;
  activo: boolean;
  usuarioRegistro?: string;
  fechaRegistro?: Date;
  usuarioActualizacion?: string;
  fechaActualizacion?: Date;
}

export interface EtapaResponse {
  success: boolean;
  message: string;
  data: Etapa | Etapa[];
  total?: number;
}

export interface EtapaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Mapper para convertir entre DTOs y modelos internos
 */
export class EtapaMapper {
  /**
   * Convierte EtapaDto a Etapa
   */
  static fromDto(dto: EtapaDto): Etapa {
    return {
      id: dto.idEtapa,
      localId: dto.local?.idLocal,
      local: dto.local ? {
        id: dto.local.idLocal,
        descripcion: dto.local.descripcion || '',
        direccion: dto.local.direccion || '',
        activo: dto.local.activo === 1
      } : undefined,
      descripcionEtapa: dto.descripcionEtapa,
      descripcion: dto.descripcion,
      activo: dto.activo === 1,
      usuarioRegistro: dto.usuarioRegistro,
      fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : undefined,
      usuarioActualizacion: dto.usuarioActualizacion,
      fechaActualizacion: dto.fechaActualizacion ? new Date(dto.fechaActualizacion) : undefined
    };
  }

  /**
   * Convierte Etapa a EtapaDto
   */
  static toDto(etapa: Etapa): EtapaDto {
    return {
      idEtapa: etapa.id,
      local: etapa.localId ? { 
        idLocal: etapa.localId,
        descripcion: etapa.local?.descripcion,
        direccion: etapa.local?.direccion,
        activo: etapa.local?.activo ? 1 : 0
      } : undefined,
      descripcionEtapa: etapa.descripcionEtapa,
      descripcion: etapa.descripcion,
      activo: etapa.activo ? 1 : 0,
      usuarioRegistro: etapa.usuarioRegistro,
      fechaRegistro: etapa.fechaRegistro?.toISOString(),
      usuarioActualizacion: etapa.usuarioActualizacion,
      fechaActualizacion: etapa.fechaActualizacion?.toISOString()
    };
  }

  /**
   * Convierte respuesta del API a EtapaResponse
   */
  static fromResponse(apiResponse: any): EtapaResponse {
    console.log('EtapaMapper: Procesando respuesta del API:', apiResponse);
    
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
        data: apiResponse.map((dto: EtapaDto) => EtapaMapper.fromDto(dto)),
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
          data: apiResponse.data.map((dto: EtapaDto) => EtapaMapper.fromDto(dto)),
          total: apiResponse.total || apiResponse.data.length
        };
      }
      
      // Si data es un solo DTO
      if (apiResponse.data) {
        return {
          success: apiResponse.success !== false,
          message: apiResponse.message || 'Dato cargado correctamente',
          data: EtapaMapper.fromDto(apiResponse.data)
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