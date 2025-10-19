import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import { AperturaTaller } from '../models/aperturataller.model';

@Injectable({ providedIn: 'root' })
export class AperturatallerService {
  private apiUrl = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.APERTURATALLER;

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(this.apiUrl + '/listarAperturaTaller', { headers: GlobalComponent.headerToken });
  }

  obtener(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/obtener/' + id, { headers: GlobalComponent.headerToken });
  }

  registrar(data: AperturaTaller): Observable<any> {
    return this.http.post(this.apiUrl + '/registrarAperturaTaller', data, { headers: GlobalComponent.headerToken });
  }

  editar(id: number, data: AperturaTaller): Observable<any> {
    return this.http.put(this.apiUrl + '/editarAperturaTaller/' + id, data, { headers: GlobalComponent.headerToken });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/eliminarAperturaTaller/' + id, { headers: GlobalComponent.headerToken });
  }
}
