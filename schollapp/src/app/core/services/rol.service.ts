import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { 
  Rol, 
  RolResponse, 
  ResponseWrapperObject, 
  RolMapper 
} from '../models/rol.model';
import { GlobalComponent } from '../../global-component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly API_URL = GlobalComponent.API_URL;
  private readonly ENDPOINTS = GlobalComponent.ENPOINTS.ROL;

  constructor(private readonly http: HttpClient) { }

  /**
   * Obtener lista de roles con paginación (simulada en el frontend)
   */
  getRoles(page: number = 1, limit: number = 10, search: string = ''): Observable<RolResponse> {
    return this.listarRoles().pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          let roles = response.data;
          
          // Filtrar por búsqueda si se proporciona
          if (search.trim()) {
            roles = roles.filter(rol => 
              rol.Descripcion.toLowerCase().includes(search.toLowerCase())
            );
          }
          
          // Aplicar paginación
          const total = roles.length;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedRoles = roles.slice(startIndex, endIndex);
          
          return {
            success: true,
            message: `Página ${page} de roles`,
            data: paginatedRoles,
            total: total
          };
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Listar todos los roles (endpoint del API)
   */
  listarRoles(): Observable<RolResponse> {
    return this.http.get<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.LISTAR}`, 
      httpOptions
    ).pipe(
      map(response => RolMapper.fromResponse(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Obtener rol por ID
   */
  getRolById(id: number): Observable<RolResponse> {
    return this.http.get<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.OBTENER}/${id}`,
      httpOptions
    ).pipe(
      map(response => RolMapper.fromResponse(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Registrar nuevo rol
   */
  registrarRol(rol: Rol): Observable<RolResponse> {
    const rolDto = RolMapper.toDto(rol);
    
    return this.http.post<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.REGISTRAR}`, 
      rolDto, 
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: response.success && response.data ? RolMapper.fromDto(response.data) : [] as Rol[]
      } as RolResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Editar rol existente
   */
  editarRol(rol: Rol): Observable<RolResponse> {
    const rolDto = RolMapper.toDto(rol);
    
    return this.http.put<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.EDITAR}`, 
      rolDto, 
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: response.success && response.data ? RolMapper.fromDto(response.data) : [] as Rol[]
      } as RolResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Eliminar rol
   */
  eliminarRol(id: number): Observable<RolResponse> {
    return this.http.delete<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.ELIMINAR}/${id}`,
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: [] as Rol[]
      } as RolResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Exportar roles (simulado - retorna datos como blob CSV)
   */
  exportarRoles(): Observable<Blob> {
    return this.listarRoles().pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          // Crear CSV simple
          const headers = ['ID', 'Descripción', 'Estado'];
          const csvContent = [
            headers.join(','),
            ...response.data.map(rol => [
              rol.IdRol || '',
              `"${rol.Descripcion}"`, // Envolver en comillas por si contiene comas
              rol.Activo ? 'ACTIVO' : 'INACTIVO'
            ].join(','))
          ].join('\n');
          
          return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        }
        return new Blob(['No data'], { type: 'text/csv' });
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo de errores
   */
  private readonly handleError = (error: any): Observable<never> => {
    console.error('Error en RolService:', error);
    
    let errorMessage = 'Error desconocido';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return throwError(() => new Error(errorMessage));
  };
}