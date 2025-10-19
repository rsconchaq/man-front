import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import { EtapaGrupo } from '../models/etapagrupo.model';

@Injectable({ providedIn: 'root' })
export class EtapagrupoService {
  private apiUrl = GlobalComponent.API_URL  ;

  constructor(private http: HttpClient) {}

  listar(id: number): Observable<any> {
    const url = `${this.apiUrl}${GlobalComponent.ENPOINTS.ETAPAGRUPO.LISTAR.replace('{idEtapa}', id.toString())}`
    return this.http.get(url, { headers: GlobalComponent.headerToken });
  }

  listarDetalle(id: number): Observable<any> {
    const url = `${this.apiUrl}${GlobalComponent.ENPOINTS.ETAPAGRUPO.LISTARGRUPODETALLE.replace('{idEtapa}', id.toString())}`
    return this.http.get(url, { headers: GlobalComponent.headerToken });
  }

  registrar(data: any): Observable<any> {
    return this.http.post(this.apiUrl + GlobalComponent.ENPOINTS.ETAPAGRUPO.GUARDAR, data, { headers: GlobalComponent.headerToken });
  }

   
}
