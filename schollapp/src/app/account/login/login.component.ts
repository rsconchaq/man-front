import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first, mergeMap } from 'rxjs/operators';
import { ToastService } from './toast-service';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  @ViewChild('modalToken') modalToken!: TemplateRef<any>;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  
  // Security Code Modal Properties
  securityCode: string = '';
  isValidatingToken: boolean = false;
  tokenValidationError: string = '';
  currentUserData: any = null;
  currentToken: string = '';
  
  // Password Recovery Properties
  isRecoveringPassword: boolean = false;
  
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: UntypedFormBuilder,private authenticationService: AuthenticationService,private router: Router,
    private authFackservice: AuthfakeauthenticationService,private route: ActivatedRoute,
    public toastservice: ToastService,
    private modalService: NgbModal,
    private store: Store) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }

    // Verificar si la sesión expiró
    const expired = this.route.snapshot.queryParams['expired'];
    if (expired === 'true') {
      Swal.fire({
        icon: 'warning',
        title: 'Sesión Expirada',
        text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
    }

    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    } else {
      Swal.fire({
      title: "Iniciando sesión...",
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
        this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data:any) => {
      Swal.close();
      if(data.success === true && data.data != 0){
        // Store temporary user data and token data convertir a objeto

                    
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                       
                   
        this.currentUserData = JSON.parse(data.data.currentUser);
        this.currentToken =  this.currentUserData.token;
         // Open security code validation modal
        this.openSecurityModal();
      } else {
        this.toastservice.show('Email o contraseña incorrectos', { classname: 'bg-danger text-white', delay: 15000 });
      }
    });
       
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
   * Open Security Code Modal
   */
  openSecurityModal() {
    this.securityCode = '';
    this.tokenValidationError = '';
    this.isValidatingToken = false;
    this.modalService.open(this.modalToken, { size: 'md', centered: true, backdrop: 'static' });
  }

  /**
   * Recuperar Contraseña
   */
  recuperarContrasena() {
    // Validar que se haya ingresado un email
    const emailControl = this.loginForm.get('email');
    
    if (!emailControl?.value || emailControl.value.trim() === '') {
      this.toastservice.show('Por favor ingrese su email antes de recuperar la contraseña', { 
        classname: 'bg-warning text-white', 
        delay: 5000 
      });
      // Marcar el campo email como touched para mostrar validación
      emailControl?.markAsTouched();
      return;
    }

    // Validar formato de email
    if (emailControl.invalid) {
      this.toastservice.show('Por favor ingrese un email válido', { 
        classname: 'bg-warning text-white', 
        delay: 5000 
      });
      emailControl.markAsTouched();
      return;
    }

    // Mostrar estado de carga
    this.isRecoveringPassword = true;

    // Llamar al método validaciones
    this.authenticationService.validaciones(emailControl.value).subscribe({
      next: (response: any) => {
        this.isRecoveringPassword = false;
        
        if (response.success === true) {
          this.toastservice.show('Se ha enviado un código de recuperación a su email', { 
            classname: 'bg-success text-white', 
            delay: 10000 
          });
        } else {
          this.toastservice.show(response.message || 'Error al enviar el código de recuperación', { 
            classname: 'bg-danger text-white', 
            delay: 8000 
          });
        }
      },
      error: (error) => {
        this.isRecoveringPassword = false;
        console.error('Password recovery error:', error);
        this.toastservice.show('Error al procesar la solicitud. Intente nuevamente.', { 
          classname: 'bg-danger text-white', 
          delay: 8000 
        });
      }
    });
  }

  /**
   * Validate Security Code
   */
  validateSecurityCode(modal: any) {
    if (!this.securityCode.trim()) {
      this.tokenValidationError = 'Por favor ingrese el código de seguridad';
      return;
    }

    this.isValidatingToken = true;
    this.tokenValidationError = '';

    // Get user ID from current user data
    const userId = this.currentUserData?.id  ;
    
    if (!userId) {
      this.tokenValidationError = 'Error: No se pudo obtener el ID de usuario';
      this.isValidatingToken = false;
      return;
    }
  Swal.fire({
      title: "validando código de seguridad ...",
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    // Call validarToken API
    this.authenticationService.validarToken(this.securityCode, userId).subscribe({
      next: (response: any) => {
        Swal.close();
        this.isValidatingToken = false;

        if (response.success === true && response.data == 1) {
          this.isValidatingToken = true;
          // Token validation successful
          sessionStorage.setItem('toast', 'true');
          sessionStorage.setItem('currentUser', JSON.stringify(this.currentUserData));
          sessionStorage.setItem('token', this.currentToken);
          
          // Close modal and navigate
          modal.close();
          this.router.navigate(['/']);
        } else {
          this.tokenValidationError =  'Código de seguridad inválido';
        }
      },
      error: (error) => {
        this.isValidatingToken = false;
        this.tokenValidationError = 'Error al validar el código. Intente nuevamente.';
        console.error('Token validation error:', error);
      }
    });
  }

}
