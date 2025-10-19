import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apoderado } from '../models/apoderado.model';
import { GlobalComponent } from '../../global-component';

@Injectable({ providedIn: 'root' })
export class ApoderadoService {
  private apiUrl = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.APODERADO;

  constructor(private http: HttpClient) {}

  listarApoderados(): Observable<any> {
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.APODERADO.LISTAR, { headers: GlobalComponent.headerToken });
  }

  obtenerApoderado(id: number): Observable<any> {
    return this.http.get(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.APODERADO.OBTENER}/${id}`, { headers: GlobalComponent.headerToken });
  }

  crearApoderado(apoderado: Apoderado): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.APODERADO.REGISTRAR, apoderado, { headers: GlobalComponent.headerToken });
  }

  actualizarApoderado(id: number, apoderado: Apoderado): Observable<any> {
    return this.http.put(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.APODERADO.EDITAR}/${id}`, apoderado, { headers: GlobalComponent.headerToken });
  }

  eliminarApoderado(id: number): Observable<any> {
    return this.http.delete(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.APODERADO.ELIMINAR}/${id}`, { headers: GlobalComponent.headerToken });
  }
}
