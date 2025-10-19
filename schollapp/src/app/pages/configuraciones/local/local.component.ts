import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Local } from '../../../core/models/local.model';
import { LocalService } from '../../../core/services/local.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
  standalone: false
})
export class LocalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('localModal', { static: true })
  localModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  localForm: FormGroup;
  
  // Data properties
  locales: Local[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: number | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly localService: LocalService,
    private readonly modalService: NgbModal
  ) {
    this.localForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.configurarDataTables();
    this.cargarLocales();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(255)]],
      activo: [true, [Validators.required]]
    });
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
        this.localService.listarLocales().subscribe({
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
          data: 'id',
          width: '80px'
        },
        {
          title: 'Descripción',
          data: 'descripcion'
        },
        {
          title: 'Dirección',
          data: 'direccion'
        },
        {
          title: 'Estado',
          data: 'activo',
          render: (activo: boolean) => this.renderEstado(activo)
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Local) => {
            return `
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary btn-edit" 
                        data-id="${row.id}" 
                        data-descripcion="${row.descripcion}"
                        data-direccion="${row.direccion}"
                        data-activo="${row.activo}">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" 
                        data-id="${row.id}"
                        data-descripcion="${row.descripcion}">
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
        const local: Local = {
          id: parseInt(button.dataset['id'] || '0'),
          descripcion: button.dataset['descripcion'] || '',
          direccion: button.dataset['direccion'] || '',
          activo: button.dataset['activo'] === 'true'
        };
        this.editarLocal(local);
      }
      
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const local: Local = {
          id: parseInt(button.dataset['id'] || '0'),
          descripcion: button.dataset['descripcion'] || '',
          direccion: '',
          activo: true
        };
        this.eliminarLocal(local);
      }
    });
  }

  /**
   * Renderizar estado del local
   */
  private renderEstado(activo: boolean): string {
    if (activo === true) {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
  }

  /**
   * Cargar locales
   */
  private cargarLocales(): void {
    this.loading = true;
    this.localService.listarLocales().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.locales = response.data as Local[] || [];
          this.recargarDataTable();
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al cargar locales:', error);
        this.mostrarError('Error al cargar los locales');
      }
    });
  }

  /**
   * Recargar DataTable
   */
  private recargarDataTable(): void {
    if (this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      });
    }
  }

  /**
   * Abrir modal para crear local
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.localForm.reset();
    this.localForm.patchValue({ activo: true });
    this.modalRef = this.modalService.open(this.localModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Editar local
   */
  editarLocal(local: Local): void {
    this.editMode = true;
    this.currentEditId = local.id!;
    this.localForm.patchValue({
      descripcion: local.descripcion,
      direccion: local.direccion,
      activo: local.activo
    });
    this.modalRef = this.modalService.open(this.localModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Verificar si un campo es inválido
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.localForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  /**
   * Cerrar modal
   */
  cerrarModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  /**
   * Enviar formulario
   */
  onSubmit(): void {
    if (this.localForm.valid) {
      const localData = this.localForm.value;
      
      if (this.editMode) {
        this.actualizarLocal(localData);
      } else {
        this.crearLocal(localData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Crear nuevo local
   */
  private crearLocal(localData: any): void {
    this.loading = true;
    this.localService.crearLocal(localData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Local creado exitosamente');
          this.cerrarModal();
          this.cargarLocales();
        } else {
          this.mostrarError(response.message || 'Error al crear el local');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al crear local:', error);
        this.mostrarError('Error al crear el local');
      }
    });
  }

  /**
   * Actualizar local existente
   */
  private actualizarLocal(localData: any): void {
    if (!this.currentEditId) return;
    
    this.loading = true;
    const updateData = { ...localData, idLocal: this.currentEditId };
    
    this.localService.actualizarLocal(this.currentEditId, updateData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Local actualizado exitosamente');
          this.cerrarModal();
          this.cargarLocales();
        } else {
          this.mostrarError(response.message || 'Error al actualizar el local');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al actualizar local:', error);
        this.mostrarError('Error al actualizar el local');
      }
    });
  }

  /**
   * Eliminar local
   */
  eliminarLocal(local: Local): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el local "${local.descripcion}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && local.id) {
        this.ejecutarEliminacion(local.id);
      }
    });
  }

  /**
   * Ejecutar eliminación
   */
  private ejecutarEliminacion(id: number): void {
    this.loading = true;
    this.localService.eliminarLocal(id).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Local eliminado exitosamente');
          this.cargarLocales();
        } else {
          this.mostrarError(response.message || 'Error al eliminar el local');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al eliminar local:', error);
        this.mostrarError('Error al eliminar el local');
      }
    });
  }

  /**
   * Marcar campos del formulario como tocados
   */
  private markFormGroupTouched(): void {
    Object.keys(this.localForm.controls).forEach(key => {
      this.localForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Mostrar mensaje de éxito
   */
  private mostrarExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });
  }

  /**
   * Mostrar mensaje de error
   */
  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }
}