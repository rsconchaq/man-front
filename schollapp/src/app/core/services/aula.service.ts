import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Aula, AulaDto, AulaResponse, AulaMapper } from '../models/aula.model';
import { GlobalComponent } from '../../global-component';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private readonly apiUrl = GlobalComponent.API_URL;
  private readonly endpoints = GlobalComponent.ENPOINTS.AULA;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la lista de todas las aulas
   */
  listarAulas(): Observable<AulaResponse> {
    const url = `${this.apiUrl}${this.endpoints.LISTAR}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => AulaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtiene un aula por ID
   */
  getAulaById(id: number): Observable<AulaResponse> {
    const url = `${this.apiUrl}${this.endpoints.OBTENER}/${id}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => AulaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Crea una nueva aula
   */
  crearAula(aula: Aula): Observable<AulaResponse> {
    const url = `${this.apiUrl}${this.endpoints.REGISTRAR}`;
    const dto = AulaMapper.toDto(aula);
    
    return this.http.post<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => AulaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualiza un aula existente
   */
  actualizarAula(id: number, aula: Aula | any): Observable<AulaResponse> {
    const url = `${this.apiUrl}${this.endpoints.EDITAR}`;
    
    // Si ya es un DTO o un objeto plano, lo usamos directamente
    // Si es un objeto Aula, lo convertimos a DTO
    let dto: AulaDto;
    if (aula.hasOwnProperty('idAula') || typeof aula.activo === 'number') {
      dto = aula;
    } else {
      dto = AulaMapper.toDto(aula);
    }
    
    // Asegurar que tenga el ID
    dto.idAula = id;
    
    return this.http.put<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => AulaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Elimina un aula
   */
  eliminarAula(id: number): Observable<AulaResponse> {
    const url = `${this.apiUrl}${this.endpoints.ELIMINAR}/${id}`;
    
    return this.http.delete<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => AulaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      } else if (error.status >= 500) {
        errorMessage = 'Error interno del servidor. Intente más tarde.';
      }
    }

    console.error('Error en AulaService:', error);
    return throwError(() => new Error(errorMessage));
  }
}