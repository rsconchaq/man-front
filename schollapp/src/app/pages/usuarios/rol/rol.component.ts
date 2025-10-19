import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Rol } from '../../../core/models/rol.model';
import { RolService } from '../../../core/services/rol.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
  standalone: false
})
export class RolComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('rolModal', { static: true })
  rolModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  rolForm: FormGroup;
  
  // Data properties
  roles: Rol[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: number | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly rolService: RolService,
    private readonly modalService: NgbModal
  ) {
    this.rolForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.configurarDataTables();
    this.cargarRoles();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Clean up DataTables
    this.dtTrigger.unsubscribe();
  }

  /**
   * Configurar DataTables
   */
  private configurarDataTables(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      processing: true,
      searching: true,
      ordering: true,
      info: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        infoPostFix: '',
        loadingRecords: 'Cargando...',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        }
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        this.rolService.listarRoles().subscribe({
          next: (response) => {
            if (response.success && Array.isArray(response.data)) {
              callback({
                recordsTotal: response.data.length,
                recordsFiltered: response.data.length,
                data: response.data
              });
            } else {
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            }
          },
          error: (error) => {
            console.error('Error loading data:', error);
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          }
        });
      },
      columns: [
        {
          title: 'ID',
          data: 'IdRol',
          width: '80px'
        },
        {
          title: 'Descripción',
          data: 'Descripcion'
        },
        {
          title: 'Estado',
          data: 'Activo',
          render: (activo: boolean) => this.renderEstado(activo)
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Rol) => {
            return `
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary btn-edit" 
                        data-id="${row.IdRol}" 
                        data-descripcion="${row.Descripcion}"
                        data-activo="${row.Activo}">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" 
                        data-id="${row.IdRol}"
                        data-descripcion="${row.Descripcion}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            `;
          }
        }
      ]
    };

    // Event delegation para botones dinámicos
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.closest('.btn-edit')) {
        const button = target.closest('.btn-edit') as HTMLElement;
        const rol: Rol = {
          IdRol: parseInt(button.dataset['id'] || '0'),
          Descripcion: button.dataset['descripcion'] || '',
          Activo: button.dataset['activo'] === 'true'
        };
        this.editarRol(rol);
      }
      
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const rol: Rol = {
          IdRol: parseInt(button.dataset['id'] || '0'),
          Descripcion: button.dataset['descripcion'] || '',
          Activo: true
        };
        this.eliminarRol(rol);
      }
    });
  }


  /**
   * Renderizar estado del rol
   */
  private renderEstado(activo: boolean): string {
    if (activo === true) {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
  }

  /**
   * Inicializar formulario
   */
  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      descripcion: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-ZÀ-ÿ0-9\s]+$/)
      ]],
      activo: [true, [Validators.required]]
    });
  }

  /**
   * Validación de campos del formulario
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.rolForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  /**
   * Cargar lista de roles
   */
  cargarRoles(): void {
    this.loading = true;
    this.rolService.listarRoles()
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.roles = Array.isArray(response.data) ? response.data : [];
           } else {
             Swal.fire({
                title: 'Error',
                text: 'Error al cargar roles: ' + response.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            this.roles = [];
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar roles:', error);
           Swal.fire({
            title: 'Error',
            text: 'Error al cargar roles. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.roles = [];
          this.loading = false;
        }
      });
  }

  
  /**
   * Abrir modal para nuevo rol
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.limpiarFormulario();
    this.abrirModal();
  }

  /**
   * Abrir modal para editar rol
   */
  editarRol(rol: Rol): void {
    this.editMode = true;
    this.currentEditId = rol.IdRol || null;
    
    this.rolForm.patchValue({
      descripcion: rol.Descripcion,
      activo: rol.Activo
    });
    
    this.abrirModal();
  }

  /**
   * Abrir modal
   */
  private abrirModal(): void {
    try {
      // Cerrar modal anterior si existe
      if (this.modalRef) {
        this.modalRef.close();
      }
      
      // Abrir modal con NgbModal usando el template reference
      this.modalRef = this.modalService.open(this.rolModalTemplate, {
        backdrop: 'static',
        keyboard: false,
        size: 'md'
      });
      
      // Manejar el cierre del modal
      this.modalRef.result.then(
        () => {
          // Modal cerrado con resultado
          this.limpiarFormulario();
        },
        () => {
          // Modal cerrado sin resultado (dismissed)
          this.limpiarFormulario();
        }
      );
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  /**
   * Cerrar modal
   */
  cerrarModal(): void {
    try {
      if (this.modalRef) {
        this.modalRef.close();
        this.modalRef = null;
      }
      this.limpiarFormulario();
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }

  /**
   * Envío del formulario
   */
  onSubmit(): void {
    if (this.rolForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const descripcion = this.rolForm.get('descripcion')?.value?.trim();
    
    if (!this.validarDescripcionUnica(descripcion, this.currentEditId || undefined)) {
       Swal.fire({
        title: 'Información',
        text: 'Ya existe un rol con esa descripción',
        icon: 'warning',
        confirmButtonText: 'OK'
        });
      return;
    }

    const rol: Rol = {
      IdRol: this.currentEditId || 0,
      Descripcion: descripcion,
      Activo: this.rolForm.get('activo')?.value
    };
    
    if (this.editMode && this.currentEditId) {
      this.actualizarRol(rol);
    } else {
      this.crearRol(rol);
    }
  }

  /**
   * Crear nuevo rol
   */
  private crearRol(rol: Rol): void {
    this.loading = true;
    this.rolService.registrarRol(rol)
      .subscribe({
        next: (response) => {
          if (response.success) {
             Swal.fire({
                title: 'Éxito',
                text: 'Rol creado exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            this.cerrarModal();
            this.reloadDataTable();
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al crear rol: ' + (response.message || 'Error desconocido'),
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al crear rol:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error al crear rol. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
            });
          this.loading = false;
        }
      });
  }

  /**
   * Actualizar rol existente
   */
  private actualizarRol(rol: Rol): void {
    this.loading = true;
    this.rolService.editarRol(rol)
      .subscribe({
        next: (response) => {
          if (response.success) {
             Swal.fire({
              title: 'Éxito',
              text: 'Rol actualizado exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            this.cerrarModal();
            this.reloadDataTable();
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al actualizar rol: ' + (response.message || 'Error desconocido'),
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al actualizar rol:', error);
           
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar rol. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.loading = false;
        }
      });
  }

  /**
   * Eliminar rol
   */
  eliminarRol(rol: Rol): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el rol "${rol.Descripcion}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && rol.IdRol) {
        this.confirmarEliminacion(rol.IdRol);
      }
    });
  }

  /**
   * Confirmar eliminación
   */
  private confirmarEliminacion(id: number): void {
    this.loading = true;
    this.rolService.eliminarRol(id)
      .subscribe({
        next: (response) => {
          if (response.success) {
             Swal.fire({
              title: 'Éxito',
              text: 'Rol eliminado exitosamente',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.reloadDataTable();
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al eliminar rol: ' + response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al eliminar rol:', error);
           Swal.fire({
            title: 'Error',
            text: 'Error al eliminar rol. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.loading = false;
        }
      });
  }

  /**
   * Validar descripción única
   */
  private validarDescripcionUnica(descripcion: string, idActual?: number): boolean {
    return !this.roles.some(rol => 
      rol.Descripcion.toLowerCase().trim() === descripcion.toLowerCase().trim() && 
      rol.IdRol !== idActual
    );
  }

  /**
   * Limpiar formulario
   */
  private limpiarFormulario(): void {
    this.rolForm.reset();
    this.rolForm.patchValue({
      descripcion: '',
      activo: true
    });
    
    Object.keys(this.rolForm.controls).forEach(key => {
      const control = this.rolForm.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      }
    });
    
    this.editMode = false;
    this.currentEditId = null;
  }

  /**
   * Marcar todos los campos como tocados
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.rolForm.controls).forEach(key => {
      const control = this.rolForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

 
  
  reloadDataTable(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance?.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      }).catch((error: any) => {
        console.error('Error reloading DataTable:', error);
      });
    }
  }
}