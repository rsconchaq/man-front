import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Etapa, EtapaDto, EtapaResponse, EtapaMapper } from '../models/etapa.model';
import { GlobalComponent } from '../../global-component';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {
  private readonly apiUrl = GlobalComponent.API_URL;
  private readonly endpoints = GlobalComponent.ENPOINTS.ETAPA;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la lista de todas las etapas
   */
  listarEtapas(): Observable<EtapaResponse> {
    const url = `${this.apiUrl}${this.endpoints.LISTAR}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => EtapaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtiene una etapa por ID
   */
  getEtapaById(id: number): Observable<EtapaResponse> {
    const url = `${this.apiUrl}${this.endpoints.OBTENER}/${id}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => EtapaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Crea una nueva etapa
   */
  crearEtapa(etapa: Etapa): Observable<EtapaResponse> {
    const url = `${this.apiUrl}${this.endpoints.REGISTRAR}`;
    const dto = EtapaMapper.toDto(etapa);
    
    return this.http.post<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => EtapaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualiza una etapa existente
   */
  actualizarEtapa(id: number, etapa: Etapa | any): Observable<EtapaResponse> {
    const url = `${this.apiUrl}${this.endpoints.EDITAR}`;
    
    // Si ya es un DTO o un objeto plano, lo usamos directamente
    // Si es un objeto Etapa, lo convertimos a DTO
    let dto: EtapaDto;
    if (etapa.hasOwnProperty('idEtapa') || typeof etapa.activo === 'number') {
      dto = etapa;
    } else {
      dto = EtapaMapper.toDto(etapa);
    }
    
    // Asegurar que tenga el ID
    dto.idEtapa = id;
    dto.activo = etapa.activo=="true" ? 1 : 0;
    
    return this.http.put<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => EtapaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Elimina una etapa
   */
  eliminarEtapa(id: number): Observable<EtapaResponse> {
    const url = `${this.apiUrl}${this.endpoints.ELIMINAR}/${id}`;
    
    return this.http.delete<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => EtapaMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Maneja errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<EtapaResponse> {
    console.error('Error en EtapaService:', error);
    
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
    }
    
    const errorResponse: EtapaResponse = {
      success: false,
      message: errorMessage,
      data: []
    };
    
    return throwError(() => errorResponse);
  }
}