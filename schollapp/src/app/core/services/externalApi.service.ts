import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { GlobalComponent } from "src/app/global-component";

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  private apiUrl = GlobalComponent.API_URL;

  constructor(private http: HttpClient) {}

    obtenerApi(numeroDocu: any): Observable<any> {
       const url = `${this.apiUrl}${GlobalComponent.ENPOINTS.EXTERNAL_API.OBTENER.replace('{numeroDocumento}', numeroDocu.toString())}`;
      return this.http.get(url, { headers: GlobalComponent.headerToken });
    }
}