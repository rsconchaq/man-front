import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';
import { GlobalComponent } from '../../global-component';

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private apiUrl = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.DOCENTE;

  constructor(private http: HttpClient) {}

  listarDocentes(): Observable<any> {
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.DOCENTE.LISTAR, { headers: GlobalComponent.headerToken });
  }

  obtenerDocente(id: number): Observable<any> {
    return this.http.get(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.DOCENTE.OBTENER}/${id}`, { headers: GlobalComponent.headerToken });
  }

  crearDocente(docente: Docente): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.DOCENTE.REGISTRAR, docente, { headers: GlobalComponent.headerToken });
  }

  actualizarDocente(id: number, docente: Docente): Observable<any> {
    return this.http.put(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.DOCENTE.EDITAR}/${id}`, docente, { headers: GlobalComponent.headerToken });
  }

  eliminarDocente(id: number): Observable<any> {
    return this.http.delete(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.DOCENTE.ELIMINAR}/${id}`, { headers: GlobalComponent.headerToken });
  }
}
