import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Local, LocalDto, LocalResponse, LocalMapper } from '../models/local.model';
import { GlobalComponent } from '../../global-component';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly apiUrl = GlobalComponent.API_URL;
  private readonly endpoints = GlobalComponent.ENPOINTS.LOCAL;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la lista de todos los locales
   */
  listarLocales(): Observable<LocalResponse> {
    const url = `${this.apiUrl}${this.endpoints.LISTAR}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => LocalMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtiene un local por ID
   */
  getLocalById(id: number): Observable<LocalResponse> {
    const url = `${this.apiUrl}${this.endpoints.OBTENER}/${id}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => LocalMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Crea un nuevo local
   */
  crearLocal(local: Local): Observable<LocalResponse> {
    const url = `${this.apiUrl}${this.endpoints.REGISTRAR}`;
    const dto = LocalMapper.toDto(local);
    
    return this.http.post<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => LocalMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualiza un local existente
   */
  actualizarLocal(id: number, local: Local | any): Observable<LocalResponse> {
    const url = `${this.apiUrl}${this.endpoints.EDITAR}`;
    
    // Si ya es un DTO o un objeto plano, lo usamos directamente
    // Si es un objeto Local, lo convertimos a DTO
    let dto: LocalDto;
    if (local.hasOwnProperty('idLocal') || typeof local.activo === 'number') {
      dto = local;
    } else {
      dto = LocalMapper.toDto(local);
    }
    
    // Asegurar que tenga el ID
    dto.idLocal = id;
    dto.activo = local.activo=="true" ? 1 : 0;
    
    return this.http.put<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => LocalMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Elimina un local
   */
  eliminarLocal(id: number): Observable<LocalResponse> {
    const url = `${this.apiUrl}${this.endpoints.ELIMINAR}/${id}`;
    
    return this.http.delete<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => LocalMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Maneja errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<LocalResponse> {
    console.error('Error en LocalService:', error);
    
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
    }
    
    const errorResponse: LocalResponse = {
      success: false,
      message: errorMessage,
      data: []
    };
    
    return throwError(() => errorResponse);
  }
}