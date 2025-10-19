import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Usuario } from '../../../core/models/usuario.model';
import { Rol } from '../../../core/models/rol.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { RolService } from '../../../core/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: false
})
export class UsuarioComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  breadCrumbItems!: Array<{}>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  loading = false;
  editMode = false;
  currentEditId: number | null = null;
  showPassword = false;
  componenteDestruyendose = false;
  
  // Visibilidad de contraseñas en la tabla
  passwordVisibility: { [key: string]: boolean } = {};
  
  // Búsqueda y filtros
  searchTerm = '';
  buscarRol = '';
  
  // DataTable state
  dataTableInicializada = false;
  mostrarTabla = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly rolService: RolService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
      this.breadCrumbItems = [
      { label: 'Ususarios' },
      { label: 'usuario', active: true }
    ];
    this.configurarDataTable();
    this.cargarRoles();
  }

  ngAfterViewInit(): void {
    this.inicializarDataTable();
  }

  ngOnDestroy(): void {
    this.componenteDestruyendose = true;
    
    if (this.dtTrigger && !this.dtTrigger.closed) {
      this.dtTrigger.unsubscribe();
    }
    
    // Remover event listeners
    $(document).off('click', '.toggle-password-btn');
    $(document).off('click', '.edit-user-btn');
    $(document).off('click', '.delete-user-btn');
  }

  private configurarDataTable(): void {
    const self = this;
    
    this.dtOptions = {
      processing: true,
      serverSide: false,
      pageLength: 10,
      pagingType: 'full_numbers',
      searching: true,
      ordering: true,
      info: true,
      language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        search: 'Buscar:',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      },
      data: [], // Inicialmente vacío
      columns: [
        {
          title: 'ID',
          data: 'id',
          width: '60px',
          className: 'text-center'
        },
        {
          title: 'Nombres',
          data: 'nombres',
          className: 'text-left'
        },
        {
          title: 'Apellidos', 
          data: 'apellidos',
          className: 'text-left'
        },
        {
          title: 'Usuario',
          data: 'loginUsuario',
          className: 'text-left'
        },
        {
          title: 'Contraseña',
          data: 'loginClave',
          orderable: false,
          className: 'text-center',
          render: function(data: any, type: any, row: any) {
            const isVisible = self.passwordVisibility[row.id] || false;
            const passwordDisplay = isVisible ? data : '••••••••';
            const buttonText = isVisible ? 'Ocultar' : 'Ver';
            const buttonClass = isVisible ? 'btn-warning' : 'btn-info';
            
            return `
              <div class="d-flex align-items-center justify-content-center">
                <span class="me-2">${passwordDisplay}</span>
                <button type="button" class="btn ${buttonClass} btn-sm toggle-password-btn" 
                        data-user-id="${row.id}">
                  <i class="fas fa-eye${isVisible ? '-slash' : ''}"></i> ${buttonText}
                </button>
              </div>
            `;
          }
        },
        {
          title: 'Rol',
          data: 'rol.descripcion',
          className: 'text-center',
          render: function(data: any) {
            return data || 'Sin rol';
          }
        },
        {
          title: 'Estado',
          data: 'activo',
          className: 'text-center',
          render: function(data: any) {
            return data ? 
              '<span class="badge bg-success">Activo</span>' : 
              '<span class="badge bg-danger">Inactivo</span>';
          }
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          className: 'text-center',
          width: '120px',
          render: function(data: any, type: any, row: any) {
            return `
              <div class="btn-group" role="group">
                <button class="btn btn-sm btn-primary btn-edit" 
                        data-user-id="${row.id}" title="Editar">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" 
                        data-user-id="${row.id}" title="Eliminar">
                   <i class="ri-delete-bin-line"></i>
                </button>
              </div> 
            `;
          }
        }
      ]
    };
  }

  /**
   * Cargar roles desde el servicio
   */
  private cargarRoles(): void {
    this.rolService.listarRoles()
      .subscribe({
        next: (response) => {
          if (response.success && Array.isArray(response.data)) {
            this.roles = response.data;
            console.log('Roles cargados:', this.roles);
          } else {
            console.warn('Error al cargar roles:', response.message);
            this.mostrarError('Error al cargar los roles');
          }
        },
        error: (error) => {
          console.error('Error al cargar roles:', error);
          this.mostrarError('Error al cargar los roles');
        }
      });
  }

  /**
   * Cargar datos de usuarios para DataTable
   */
  private cargarDatosUsuarios(): void {
    this.loading = true;
    this.usuarioService.listarUsuarios()
      .subscribe({
        next: (response) => {
          if (response.success && Array.isArray(response.data)) {
            this.usuarios = response.data;
            this.actualizarDataTable();
          } else {
            this.mostrarError('Error al cargar usuarios: ' + response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar usuarios:', error);
          this.mostrarError('Error al cargar usuarios. Intente nuevamente.');
          this.loading = false;
        }
      });
  }

  /**
   * Actualizar datos en DataTable
   */
  private actualizarDataTable(): void {
    if (this.dataTableInicializada && this.dtElement) {
      this.dtElement.dtInstance?.then((dtInstance: any) => {
        if (dtInstance) {
          dtInstance.clear();
          dtInstance.rows.add(this.usuarios);
          dtInstance.draw();
        }
      });
    }
  }

  private inicializarDataTable(): void {
    this.mostrarTabla = true;
    
    setTimeout(() => {
      if (!this.componenteDestruyendose) {
        this.dtTrigger.next(this.dtOptions);
        this.dataTableInicializada = true;
        this.configurarEventListeners();
        this.cargarDatosUsuarios();
      }
    }, 100);
  }

  private configurarEventListeners(): void {
    const self = this;
    
    // Event listener para toggle password
    $(document).on('click', '.toggle-password-btn', function(e) {
      e.preventDefault();
      const userId = $(this).data('user-id');
      self.togglePasswordVisibility(userId);
    });
    
    // Event listener para editar usuario
    $(document).on('click', '.btn-edit', function(e) {
      e.preventDefault();
      const userId = $(this).data('user-id');
      self.editarUsuario(userId);
    });
    
    // Event listener para eliminar usuario
    $(document).on('click', '.btn-delete', function(e) {
      e.preventDefault();
      const userId = $(this).data('user-id');
      self.confirmarEliminarUsuario(userId);
    });
  }

  private initializeForm(): void {
    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      loginUsuario: ['', [Validators.required, Validators.minLength(3)]],
      loginClave: ['', [Validators.required, Validators.minLength(6)]],
      idRol: ['', [Validators.required]],
      activo: [true, [Validators.required]],
      descripcionReferencia: [''],
      idReferencia: [null]
    });
  }

  /**
   * Validación de campos del formulario
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.usuarioForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  /**
   * Toggle mostrar/ocultar contraseña
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle mostrar/ocultar contraseña en la tabla
   */
  togglePasswordVisibility(userId: number): void {
    this.passwordVisibility[userId] = !this.passwordVisibility[userId];
    this.recargarDataTable();
  }

  /**
   * Recargar DataTable
   */
  private recargarDataTable(): void {
    if (this.dataTableInicializada && this.dtElement) {
      this.cargarDatosUsuarios();
    }
  }

  /**
   * Envío del formulario
   */
  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const usuario = this.usuarioForm.value as Usuario;
    
    if (this.editMode && this.currentEditId) {
      this.actualizarUsuario(this.currentEditId, usuario);
    } else {
      this.crearUsuario(usuario);
    }
  }

  /**
   * Crear nuevo usuario
   */
  private crearUsuario(usuario: Usuario): void {
    this.loading = true;
    this.usuarioService.crearUsuario(usuario)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.mostrarExito('Usuario creado exitosamente');
            this.limpiarFormulario();
            this.recargarDataTable();
          } else {
            this.mostrarError('Error al crear usuario: ' + response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.mostrarError('Error al crear usuario. Intente nuevamente.');
          this.loading = false;
        }
      });
  }

  /**
   * Actualizar usuario existente
   */
  private actualizarUsuario(id: number, usuario: Usuario): void {
    this.loading = true;
    
    // Si la contraseña está vacía, no la incluimos en la actualización
    const usuarioUpdate: any = { ...usuario };
    if (!usuarioUpdate.loginClave || usuarioUpdate.loginClave.trim() === '') {
      delete usuarioUpdate.loginClave;
    }
    
    this.usuarioService.actualizarUsuario(id, usuarioUpdate)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.mostrarExito('Usuario actualizado exitosamente');
            this.cancelarEdicion();
            this.recargarDataTable();
          } else {
            this.mostrarError('Error al actualizar usuario: ' + response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          this.mostrarError('Error al actualizar usuario. Intente nuevamente.');
          this.loading = false;
        }
      });
  }

  /**
   * Editar usuario por ID
   */
  editarUsuario(idUsuario: number): void {
    this.loading = true;
    
    this.usuarioService.getUsuarioById(idUsuario)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const usuario = Array.isArray(response.data) ? response.data[0] : response.data;
            
            if (usuario) {
              // Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                this.editMode = true;
                this.currentEditId = usuario.id || idUsuario;
                
                // Llenar el formulario con los datos del usuario
                this.usuarioForm.patchValue({
                  nombres: usuario.nombres,
                  apellidos: usuario.apellidos,
                  loginUsuario: usuario.loginUsuario,
                  loginClave: usuario.loginClave, // No mostramos la clave por seguridad, usuario debe ingresarla nuevamente
                  idRol: usuario.idRol,
                  activo: usuario.activo,
                  descripcionReferencia: usuario.descripcionReferencia || '',
                  idReferencia: usuario.idReferencia || null
                });
                
                // Marcar como no requerido temporalmente la contraseña para edición
                this.usuarioForm.get('loginClave')?.clearValidators();
                this.usuarioForm.get('loginClave')?.updateValueAndValidity();
                
                // Scroll al formulario para que el usuario vea los datos
                this.scrollToForm();
                
                this.mostrarExito('Usuario cargado para edición');
              }, 0);
            } else {
              this.mostrarError('No se encontraron datos del usuario');
            }
          } else {
            this.mostrarError('Error al cargar usuario: ' + response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar usuario:', error);
          this.mostrarError('Error al cargar usuario. Intente nuevamente.');
          this.loading = false;
        }
      });
  }

  /**
   * Confirmar eliminación de usuario
   */
  confirmarEliminarUsuario(idUsuario: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarUsuario(idUsuario);
      }
    });
  }

  /**
   * Eliminar usuario
   */
  private eliminarUsuario(idUsuario: number): void {
    this.loading = true;
    this.usuarioService.eliminarUsuario(idUsuario)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.mostrarExito('Usuario eliminado exitosamente');
            this.recargarDataTable();
          } else {
            this.mostrarError('Error al eliminar usuario: ' + response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.mostrarError('Error al eliminar usuario. Intente nuevamente.');
          this.loading = false;
        }
      });
  }

  /**
   * Confirmar eliminación de usuario
   */

  /**
   * Marcar todos los campos como tocados
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.usuarioForm.controls).forEach(key => {
      this.usuarioForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Limpiar formulario
   */
  limpiarFormulario(): void {
    this.usuarioForm.reset();
    this.usuarioForm.patchValue({
      activo: true // Establecer valor por defecto
    });
    
    // Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.editMode = false;
      this.currentEditId = null;
    }, 0);
  }

  /**
   * Cancelar edición
   */
  cancelarEdicion(): void {
    // Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.editMode = false;
      this.currentEditId = null;
      this.limpiarFormulario();
      
      // Restaurar validación de contraseña
      this.usuarioForm.get('loginClave')?.setValidators([Validators.required]);
      this.usuarioForm.get('loginClave')?.updateValueAndValidity();
    }, 0);
  }

  /**
   * Scroll al formulario para mejor UX
   */
  private scrollToForm(): void {
    setTimeout(() => {
      const formElement = document.querySelector('#usuarioForm');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  /**
   * Mostrar mensaje de éxito
   */
  private mostrarExito(mensaje: string): void {
    Swal.fire({
      title: '¡Éxito!',
      text: mensaje,
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
  }

  /**
   * Mostrar mensaje de error
   */
  private mostrarError(mensaje: string): void {
    Swal.fire({
      title: '¡Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}