// DTOs basados en el API backend
export interface AulaDto {
  idAula?: number;
  local?: any; // LocalDto reference
  descripcionAula: string;
  descripcion: string;
  activo: number; // 1 = Activo, 0 = Inactivo
  usuarioRegistro?: string;
  fechaRegistro?: string;
}

// Modelo para uso interno de la aplicación
export interface Aula {
  id?: number;
  idLocal?: number;
  localDescripcion?: string;
  descripcionAula: string;
  descripcion: string;
  activo: boolean;
  usuarioRegistro?: string;
  fechaRegistro?: Date;
  fechaActualizacion?: Date;
}

export interface AulaResponse {
  success: boolean;
  message: string;
  data: Aula | Aula[];
  total?: number;
}

/**
 * Mapper para convertir entre DTOs y modelos internos
 */
export class AulaMapper {
  /**
   * Convierte AulaDto a Aula
   */
  static fromDto(dto: AulaDto): Aula {
    return {
      id: dto.idAula,
      idLocal: dto.local?.idLocal,
      localDescripcion: dto.local?.descripcion || '',
      descripcionAula: dto.descripcionAula,
      descripcion: dto.descripcion,
      activo: dto.activo === 1,
      usuarioRegistro: dto.usuarioRegistro,
      fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : undefined
    };
  }

  /**
   * Convierte Aula a AulaDto
   */
  static toDto(aula: Aula): AulaDto {
    return {
      idAula: aula.id,
      local: aula.idLocal ? { idLocal: aula.idLocal } : undefined,
      descripcionAula: aula.descripcionAula,
      descripcion: aula.descripcion,
      activo: aula.activo ? 1 : 0,
      usuarioRegistro: aula.usuarioRegistro,
      fechaRegistro: aula.fechaRegistro?.toISOString()
    };
  }

  /**
   * Convierte respuesta del API a AulaResponse
   */
  static fromResponse(response: any): AulaResponse {
    if (!response) {
      return {
        success: false,
        message: 'Respuesta vacía del servidor',
        data: []
      };
    }

    try {
      let data: Aula | Aula[] = [];

      if (response.data) {
        if (Array.isArray(response.data)) {
          data = response.data.map((item: AulaDto) => this.fromDto(item));
        } else {
          data = this.fromDto(response.data);
        }
      }

      return {
        success: response.success !== false,
        message: response.message || 'Operación exitosa',
        data: data,
        total: response.total || (Array.isArray(data) ? data.length : 1)
      };
    } catch (error) {
      console.error('Error al mapear respuesta de Aula:', error);
      return {
        success: false,
        message: 'Error al procesar la respuesta del servidor',
        data: []
      };
    }
  }
}