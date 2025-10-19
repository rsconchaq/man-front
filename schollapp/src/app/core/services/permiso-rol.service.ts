import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalComponent } from '../../global-component';
import { PermisoRol, PermisoRolResponse, PermisoRolMapper } from '../models/permiso-rol.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PermisoRolService {
  private readonly API_URL = GlobalComponent.API_URL;
  private readonly ENDPOINTS = GlobalComponent.ENPOINTS.PERMISO_ROL;

  constructor(private readonly http: HttpClient) { }

  /**
   * Listar permisos por rol
   */
  listarPermisos(idRol?: number): Observable<PermisoRolResponse> {
    let url = `${this.API_URL}${this.ENDPOINTS.LISTAR}`;
    if (idRol) {
      url += `/${idRol}`;
    }

    return this.http.get<any>(url, httpOptions).pipe(
      map(response => {
        console.log('Respuesta del servicio listarPermisos:', response);
        return PermisoRolMapper.fromResponse(response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Guardar permisos de rol
   */
  guardarPermisos(permisos: PermisoRol[]): Observable<PermisoRolResponse> {
    const permisosRequest = permisos.map(p => PermisoRolMapper.toRequest(p));
    
    console.log('Enviando permisos:', permisosRequest);
    
    return this.http.post<any>(
      `${this.API_URL}${this.ENDPOINTS.GUARDAR}`, 
      permisosRequest,
      httpOptions
    ).pipe(
      map(response => {
        console.log('Respuesta del servicio guardarPermisos:', response);
        return PermisoRolMapper.fromResponse(response);
      }),
      catchError(this.handleError)
    );
  }

 

  /**
   * Manejo de errores
   */
  private readonly handleError = (error: any): Observable<PermisoRolResponse> => {
    console.error('Error en PermisoRolService:', error);
    
    const errorResponse: PermisoRolResponse = {
      success: false,
      message: error?.error?.message || error?.message || 'Error desconocido en el servicio',
      data: []
    };
    
    return of(errorResponse);
  };
}