import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { GlobalComponent } from '../../global-component';

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private apiUrl = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO;

  constructor(private http: HttpClient) {}

  listarAlumnos(): Observable<any> {
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.LISTAR, { headers: GlobalComponent.headerToken });
  }

  obtenerAlumno(id: number): Observable<any> {
    return this.http.get(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.ALUMNO.OBTENER}/${id}`, { headers: GlobalComponent.headerToken });
  }

  crearAlumno(alumno: Alumno): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.REGISTRAR, alumno, { headers: GlobalComponent.headerToken });
  }

  actualizarAlumno(id: number, alumno: Alumno): Observable<any> {
    return this.http.put(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.ALUMNO.EDITAR}/${id}`, alumno, { headers: GlobalComponent.headerToken });
  }

  eliminarAlumno(id: number): Observable<any> {
    return this.http.delete(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.ALUMNO.ELIMINAR}/${id}`, { headers: GlobalComponent.headerToken });
  }

  listarTalleresMatriculados(idAlumno: number): Observable<any> {
    const url = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.LISTARTALLERESMATRICULADOS.replace('{idAlumno}', idAlumno.toString());
    return this.http.get(url, { headers: GlobalComponent.headerToken });
  }

  listarSeguimientoTallerMatriculado(idMatricula: number): Observable<any> {
    const url = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.SEGUIMIENTOTALLERESMATRICULADOS.replace('{idMatricula}', idMatricula.toString());
    return this.http.get(url, { headers: GlobalComponent.headerToken });
  }

  listarCuotasTallerMatriculado(idMatricula: number): Observable<any> {
    const url = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.CUOTASTALLERESMATRICULADOS.replace('{idMatricula}', idMatricula.toString());
    return this.http.get(url, { headers: GlobalComponent.headerToken });
  }

  actualizarSeguimientoMatriculados(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.ACTUALIZARSEGUIMIENTOMATRICULADOS, data, { headers: GlobalComponent.headerToken });
  }

  registrarCuotaPago(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.REGISTRARCUOTAPAGO, data, { headers: GlobalComponent.headerToken });
  }

  registrarCuotaPagoDetalle(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.REGISTRARCUOTAPAGODETALLE, data, { headers: GlobalComponent.headerToken });
  }

  registrarPagoCuotaDetalleMatricula(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.ALUMNO.REGISTRARPAGOCUOTADETALLEMATRICULA, data, { headers: GlobalComponent.headerToken });
  }

    
}
