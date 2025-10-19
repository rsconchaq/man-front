import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/Authentication/authentication.actions';
  
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = GlobalComponent;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    jwtdecode = "";
    user!: User;
     
    currentUserValue: any;

    private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    constructor(private http: HttpClient, private store: Store, public jwtHelper: JwtHelperService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
          
     }
 
 
    login(email: string, password: string) {

        return this.http.post(AUTH_API.API_URL + AUTH_API.ENPOINTS.AUTENTICATION.LOGIN, {
            username:email,
            password:password
          }, httpOptions).pipe(
              map((response: any) => {
                const user = response;
               this.currentUserSubject = new BehaviorSubject<User>(JSON.parse( user.data.currentUser));
                return user;
            }),
            catchError((error: any) => {
                const errorMessage = 'Login failed'; // Customize the error message as needed
                return throwError(errorMessage);
            })
        );
    }

       validarToken(token: string, IdUsuario: number) : Observable<any> {
        //http://localhost:8080/api/v1/authentication/validartoken?token=FRGsu&idUsuario=3 get como implementar
        const params = {
            token: token,
            idUsuario: IdUsuario
        };
        return this.http.get(AUTH_API.API_URL + AUTH_API.ENPOINTS.AUTENTICATION.VALIDARTOKEN, { params });          
          
    }


    validaciones(email: string) : Observable<any> {
        const params = {
            email:email,
            flag:'RECUPERAR'
          };
        return this.http.get(AUTH_API.API_URL + AUTH_API.ENPOINTS.AUTENTICATION.VALIDACIONES, { params });
    }   

    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

 
    logout() {
        this.store.dispatch(logout());
        // logout the user
        // return getFirebaseBackend()!.logout();
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.currentUserSubject.next(null!);

        return of(undefined).pipe(
        
        );

    }
 
   public getDecodedToken(): any {
    try {
      const currentUser = this.currentUserSubject.value;
      if (!currentUser || !(currentUser as any).token) {
        console.warn('No token found in currentUserSubject');
        return null;
      }
      
      const token = (currentUser as any).token;
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public isAuthenticated(): boolean {
    try {
      const currentUser = this.currentUserSubject.value;
      if (!currentUser || !(currentUser as any).token) {
        return false;
      }
      
      const token = (currentUser as any).token;
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return false;
    }
  }
}

