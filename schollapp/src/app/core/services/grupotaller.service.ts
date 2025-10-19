import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoTaller } from '../models/grupotaller.model';
import { GlobalComponent } from '../../global-component';

@Injectable({ providedIn: 'root' })
export class GrupoTallerService {
  private apiUrl = GlobalComponent.API_URL + GlobalComponent.ENPOINTS.GRUPOTALLER;

  constructor(private http: HttpClient) {}

  listarGrupoTaller(): Observable<any> {
    return this.http.get(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.GRUPOTALLER.LISTARGRUPOSYTALLERES, { headers: GlobalComponent.headerToken });
  }

  listar(id: any,idGrupo: any): Observable<any> {
    return this.http.get(`${GlobalComponent.API_URL}${GlobalComponent.ENPOINTS.GRUPOTALLER.LISTAR}`.replace('{idEtapa}', id.toString()).replace('{idGrupo}', idGrupo.toString()), { headers: GlobalComponent.headerToken });
  }
 
  asignarTalleres(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.ENPOINTS.GRUPOTALLER.ASIGNARTALLERES, data, { headers: GlobalComponent.headerToken });
  }
}
