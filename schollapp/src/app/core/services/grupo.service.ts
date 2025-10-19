import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Grupo, GrupoMapper, GrupoResponse } from '../models/grupo.model';
import { GlobalComponent } from '../../global-component';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = GlobalComponent.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los grupos de edad
   */
  listarGrupos(): Observable<GrupoResponse>  {
     const url = `${this.apiUrl}${GlobalComponent.ENPOINTS.GRUPO.LISTAR}`;

    return this.http.get<any>(url, { 
          headers: GlobalComponent.headerToken 
        }).pipe(
          map(response => GrupoMapper.fromResponse(response)),
          catchError(this.handleError.bind(this))
        );
  }

  /**
   * Obtiene un grupo específico por ID
   */
  obtenerGrupo(id: any): Observable<GrupoResponse> {
    console.log(`GrupoService: Obteniendo grupo con ID: ${id}`);
    const url = `${this.apiUrl}${GlobalComponent.ENPOINTS.GRUPO.OBTENER}/${id}`
     return this.http.get<any>(url, { 
          headers: GlobalComponent.headerToken 
        }).pipe(
          map(response => GrupoMapper.fromResponse(response)),
          catchError(this.handleError.bind(this))
        );
 
  }

  /**
   * Crea un nuevo grupo de edad
   */
  crearGrupo(grupo: Grupo): Observable<Grupo> {
    console.log('GrupoService: Creando grupo:', grupo);
    
    let grupoDto = GrupoMapper.toDto(grupo);

     
    return this.http.post<any>(this.apiUrl + GlobalComponent.ENPOINTS.GRUPO.REGISTRAR, grupoDto)
      .pipe(
        map(response => {
          console.log('GrupoService: Respuesta crear grupo:', response);
          const grupoResponse = GrupoMapper.fromResponse(response);
          
          if (!grupoResponse.success) {
            throw new Error(grupoResponse.message);
          }
          
          return Array.isArray(grupoResponse.data) 
            ? grupoResponse.data[0] 
            : grupoResponse.data as Grupo;
        }),
        catchError(error => {
          console.error('Error al crear grupo:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Actualiza un grupo existente
   */
  actualizarGrupo(id: string, grupo: Grupo): Observable<Grupo> {
    console.log(`GrupoService: Actualizando grupo ${id}:`, grupo);
    
    let grupoDto = GrupoMapper.toDto({ ...grupo, idGrupo: id });
    grupoDto.activo = grupo.activo === "true" ? 1 : 0;

    return this.http.put<any>(`${this.apiUrl}${GlobalComponent.ENPOINTS.GRUPO.EDITAR} `, grupoDto)
      .pipe(
        map(response => {
          console.log('GrupoService: Respuesta actualizar grupo:', response);
          const grupoResponse = GrupoMapper.fromResponse(response);
          
          if (!grupoResponse.success) {
            throw new Error(grupoResponse.message);
          }
          
          return Array.isArray(grupoResponse.data) 
            ? grupoResponse.data[0] 
            : grupoResponse.data as Grupo;
        }),
        catchError(error => {
          console.error(`Error al actualizar grupo ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Elimina un grupo
   */
  eliminarGrupo(id: any): Observable<boolean> {
    console.log(`GrupoService: Eliminando grupo ${id}`);
    
    return this.http.delete<any>(`${this.apiUrl}${GlobalComponent.ENPOINTS.GRUPO.ELIMINAR}/${id}`)
      .pipe(
        map(response => {
          console.log('GrupoService: Respuesta eliminar grupo:', response);
          const grupoResponse = GrupoMapper.fromResponse(response);
          return grupoResponse.success;
        }),
        catchError(error => {
          console.error(`Error al eliminar grupo ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Cambia el estado activo/inactivo de un grupo
   */
  cambiarEstado(id: string, activo: boolean): Observable<boolean> {
    console.log(`GrupoService: Cambiando estado grupo ${id} a ${activo ? 'activo' : 'inactivo'}`);
    
    return this.http.patch<any>(`${this.apiUrl}${GlobalComponent.ENPOINTS.GRUPO.EDITAR}/${id}`, { activo })
      .pipe(
        map(response => {
          console.log('GrupoService: Respuesta cambiar estado:', response);
          const grupoResponse = GrupoMapper.fromResponse(response);
          return grupoResponse.success;
        }),
        catchError(error => {
          console.error(`Error al cambiar estado del grupo ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

    private handleError(error: HttpErrorResponse): Observable<GrupoResponse> {
    console.error('Error en GrupoService:', error);
    
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
    }

    const errorResponse: GrupoResponse = {
      success: false,
      message: errorMessage,
      data: []
    };
    
    return throwError(() => errorResponse);
  }
}