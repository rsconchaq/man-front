import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly authfackservice: AuthfakeauthenticationService,
        private readonly router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Obtener el token desde sessionStorage (usado por GlobalComponent.headerToken)
        const token = sessionStorage.getItem('token');
        
        if (token) {
            // Verificar si el token ha expirado
            if (this.isTokenExpired(token)) {
                this.handleTokenExpired();
                return throwError(() => new Error('Token expirado'));
            }

            // Agregar el token al header de la petición
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else if (environment.defaultauth === 'firebase') {
            // Fallback: usar authentication service si no hay token en sessionStorage
            let currentUser = this.authenticationService.currentUser();
            if (currentUser?.token) {
                // Verificar si el token ha expirado
                if (this.isTokenExpired(currentUser.token)) {
                    this.handleTokenExpired();
                    return throwError(() => new Error('Token expirado'));
                }

                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            }
        } else {
            // Fallback: usar authfake service si no hay token en sessionStorage
            const currentUser = this.authfackservice.currentUserValue;
            if (currentUser?.token) {
                // Verificar si el token ha expirado
                if (this.isTokenExpired(currentUser.token)) {
                    this.handleTokenExpired();
                    return throwError(() => new Error('Token expirado'));
                }

                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            }
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Capturar errores 401 (No autorizado) o 403 (Prohibido)
                if (error.status === 401 || error.status === 403) {
                    this.handleTokenExpired();
                }
                return throwError(() => error);
            })
        );
    }

    /**
     * Verifica si el token JWT ha expirado
     */
    private isTokenExpired(token: string): boolean {
        try {
            const payload = this.decodeToken(token);
            if (!payload?.exp) {
                return true;
            }

            // exp viene en segundos, Date.now() en milisegundos
            const expirationDate = payload.exp * 1000;
            const currentTime = Date.now();

            return expirationDate < currentTime;
        } catch (error) {
            console.error('Error al verificar token:', error);
            return true;
        }
    }

    /**
     * Decodifica el token JWT para obtener el payload
     */
    private decodeToken(token: string): any {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
            }

            const payload = parts[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
        } catch (error) {
            console.error('Error al decodificar token:', error);
            return null;
        }
    }

    /**
     * Maneja la expiración del token: limpia la sesión y redirige al login
     */
    private handleTokenExpired(): void {
        console.warn('Token expirado o inválido. Redirigiendo al login...');

        // Limpiar el token del sessionStorage (usado por GlobalComponent.headerToken)
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');

        // Limpiar el almacenamiento local según el tipo de autenticación
        if (environment.defaultauth === 'firebase') {
            this.authenticationService.logout();
        } else {
            this.authfackservice.logout();
        }

        // Redirigir al login
        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this.router.url, expired: 'true' }
        });
    }
}
