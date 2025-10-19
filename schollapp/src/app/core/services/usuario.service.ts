import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { 
  Usuario, 
  UsuarioDto, 
  UsuarioResponse, 
  ResponseWrapperObject, 
  UsuarioMapper 
} from '../models/usuario.model';
import { GlobalComponent } from '../../global-component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = GlobalComponent.API_URL;
  private ENDPOINTS = GlobalComponent.ENPOINTS.USUARIO;

  constructor(private readonly http: HttpClient) { }

  /**
   * Obtener lista de usuarios
   */
  getUsuarios(page: number = 1, limit: number = 10, search: string = ''): Observable<UsuarioResponse> {
    return this.listarUsuarios().pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          let usuarios = response.data;
          
          // Filtrar por búsqueda si se proporciona
          if (search.trim()) {
            usuarios = usuarios.filter(usuario => 
              usuario.nombres.toLowerCase().includes(search.toLowerCase()) ||
              usuario.apellidos.toLowerCase().includes(search.toLowerCase()) ||
              usuario.loginUsuario.toLowerCase().includes(search.toLowerCase()) ||
              usuario.rol?.descripcion.toLowerCase().includes(search.toLowerCase())
            );
          }
          
          // Aplicar paginación
          const total = usuarios.length;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedUsers = usuarios.slice(startIndex, endIndex);
          
          return {
            success: true,
            message: `Página ${page} de usuarios`,
            data: paginatedUsers,
            total: total
          };
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Listar todos los usuarios (endpoint del API)
   */
  listarUsuarios(): Observable<UsuarioResponse> {
    return this.http.get<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.LISTAR}`, 
      httpOptions
    ).pipe(
      map(response => UsuarioMapper.fromResponse(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Obtener usuario por ID
   */
  getUsuarioById(id: number): Observable<UsuarioResponse> {
    return this.http.get<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.OBTENER}/${id}`,
      httpOptions
    ).pipe(
      map(response => UsuarioMapper.fromResponse(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Crear nuevo usuario
   */
  crearUsuario(usuario: Usuario): Observable<UsuarioResponse> {
    const usuarioDto = UsuarioMapper.toDto(usuario);
    
    return this.http.post<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.REGISTRAR}`, 
      usuarioDto, 
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: response.success && response.data ? UsuarioMapper.fromDto(response.data) : [] as Usuario[]
      } as UsuarioResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Actualizar usuario
   */
  actualizarUsuario(id: number, usuario: Usuario): Observable<UsuarioResponse> {
    // Asegurarse de que el ID esté en el usuario
    usuario.id = id;
    const usuarioDto = UsuarioMapper.toDto(usuario);
    
    return this.http.put<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.EDITAR}`, 
      usuarioDto, 
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: response.success && response.data ? UsuarioMapper.fromDto(response.data) : [] as Usuario[]
      } as UsuarioResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Eliminar usuario
   */
  eliminarUsuario(id: number): Observable<UsuarioResponse> {
    return this.http.delete<ResponseWrapperObject>(
      `${this.API_URL}${this.ENDPOINTS.ELIMINAR}/${id}`,
      httpOptions
    ).pipe(
      map(response => ({
        success: response.success,
        message: response.message,
        data: [] as Usuario[]
      } as UsuarioResponse)),
      catchError(this.handleError)
    );
  }

  /**
   * Buscar usuarios por rol
   */
  buscarPorRol(descripcionRol: string): Observable<UsuarioResponse> {
    return this.listarUsuarios().pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          const usuariosFiltrados = response.data.filter(usuario => 
            usuario.rol?.descripcion.toLowerCase().includes(descripcionRol.toLowerCase())
          );
          
          return {
            success: true,
            message: `Se encontraron ${usuariosFiltrados.length} usuarios`,
            data: usuariosFiltrados,
            total: usuariosFiltrados.length
          };
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Exportar usuarios
   */
  exportarUsuarios(): Observable<Blob> {
    return this.listarUsuarios().pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          // Crear CSV simple
          const headers = ['ID', 'Nombres', 'Apellidos', 'Usuario', 'Rol', 'Estado', 'Referencia'];
          const csvContent = [
            headers.join(','),
            ...response.data.map(usuario => [
              usuario.id || '',
              usuario.nombres,
              usuario.apellidos,
              usuario.loginUsuario,
              usuario.rol?.descripcion || '',
              usuario.activo ? 'ACTIVO' : 'INACTIVO',
              usuario.descripcionReferencia || ''
            ].join(','))
          ].join('\n');
          
          return new Blob([csvContent], { type: 'text/csv' });
        }
        return new Blob(['No data'], { type: 'text/csv' });
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo de errores
   */
  private handleError = (error: any): Observable<never> => {
    console.error('Error en UsuarioService:', error);
    
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