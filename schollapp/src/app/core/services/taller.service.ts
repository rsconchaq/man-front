import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Taller, TallerDto, TallerResponse, TallerMapper } from '../models/taller.model';
import { GlobalComponent } from '../../global-component';

@Injectable({
  providedIn: 'root'
})
export class TallerService {
  private readonly apiUrl = GlobalComponent.API_URL;
  private readonly endpoints = GlobalComponent.ENPOINTS.TALLER;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la lista de todos los talleres
   */
  listarTalleres(): Observable<TallerResponse> {
    const url = `${this.apiUrl}${this.endpoints.LISTAR}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => TallerMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtiene un taller por ID
   */
  getTallerById(id: number): Observable<TallerResponse> {
    const url = `${this.apiUrl}${this.endpoints.OBTENER}/${id}`;
    
    return this.http.get<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => TallerMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Crea un nuevo taller
   */
  crearTaller(taller: Taller): Observable<TallerResponse> {
    const url = `${this.apiUrl}${this.endpoints.REGISTRAR}`;
    const dto = TallerMapper.toDto(taller);
    
    return this.http.post<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => TallerMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualiza un taller existente
   */
  actualizarTaller(id: number, taller: Taller | any): Observable<TallerResponse> {
    const url = `${this.apiUrl}${this.endpoints.EDITAR}`;
    
    // Si ya es un DTO o un objeto plano, lo usamos directamente
    // Si es un objeto Taller, lo convertimos a DTO
    let dto: TallerDto;
    if (taller.hasOwnProperty('idTaller') || typeof taller.activo === 'number') {
      dto = taller;
    } else {
      dto = TallerMapper.toDto(taller);
    }
    
    // Asegurar que tenga el ID
    dto.idTaller = id;
    
    return this.http.put<any>(url, dto, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => TallerMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Elimina un taller
   */
  eliminarTaller(id: number): Observable<TallerResponse> {
    const url = `${this.apiUrl}${this.endpoints.ELIMINAR}/${id}`;
    
    return this.http.delete<any>(url, { 
      headers: GlobalComponent.headerToken 
    }).pipe(
      map(response => TallerMapper.fromResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  listarAperturaTaller(): Observable<any> {
    const url = `${this.apiUrl}${this.endpoints.LISTARAPERTURATALLER}`;

    return this.http.get<any>(url, {
      headers: GlobalComponent.headerToken
    }).pipe(
      map(response =>  response),
      catchError(this.handleError.bind(this))
    );
  }


   obtenerAperturaTallerId(id: any): Observable<any> {
    const url = `${this.apiUrl}${this.endpoints.OBTENERAPERTURATALLERID.replace('{idAperturaTaller}', id.toString())}`;

    return this.http.get<any>(url, {
      headers: GlobalComponent.headerToken
    }).pipe(
      map(response =>  response),
      catchError(this.handleError.bind(this))
    );
  }

  listarCalendarioTaller(anio:any,mes:any): Observable<any> {
    const url = `${this.apiUrl}${this.endpoints.LISTARCALENDARIOTALLER.replace('{anio}', anio).replace('{mes}', mes)}`;

    return this.http.get<any>(url, {
      headers: GlobalComponent.headerToken
    }).pipe(
      map(response =>  response),
      catchError(this.handleError.bind(this))
    );
  }


  registrarMatricula(body :any){
    
    const url = `${this.apiUrl}${this.endpoints.REGISTRARMATRICULA}`;

    return this.http.post<any>(url, body, {
      headers: GlobalComponent.headerToken,
       
    }).pipe(
      map(response => response),
      catchError(this.handleError.bind(this))
    );
  }

  aperturarTaller(body :any){
    const url = `${this.apiUrl}${this.endpoints.APERTURATALLER}`;

    return this.http.post<any>(url, body, {
      headers: GlobalComponent.headerToken,
    }).pipe(
      map(response => response),
      catchError(this.handleError.bind(this))
    );
  }
 
  /**
   * Maneja errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<TallerResponse> {
    console.error('Error en TallerService:', error);
    
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
    }
    
    const errorResponse: TallerResponse = {
      success: false,
      message: errorMessage,
      data: []
    };
    
    return throwError(() => errorResponse);
  }
}