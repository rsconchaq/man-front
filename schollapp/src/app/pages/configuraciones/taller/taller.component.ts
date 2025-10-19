import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Taller } from '../../../core/models/taller.model';
import { TallerService } from '../../../core/services/taller.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss'],
  standalone: false
})
export class TallerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('tallerModal', { static: true })
  tallerModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  tallerForm: FormGroup;
  
  // Data properties
  talleres: Taller[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: number | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tallerService: TallerService,
    private readonly modalService: NgbModal
  ) {
    this.tallerForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.configurarDataTables();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  /**
   * Inicializar formulario
   */
  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      activo: [true, [Validators.required]],
      asignado: [false, [Validators.required]]
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
        this.tallerService.listarTalleres().subscribe({
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
          title: 'Estado',
          data: 'activo',
          render: (activo: boolean) => this.renderEstado(activo)
        },
        {
          title: 'Asignado',
          data: 'asignado',
          render: (asignado: boolean) => this.renderAsignado(asignado)
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Taller) => this.renderAcciones(row)
        }
      ]
    };

    // Event delegation para botones dinámicos
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.closest('.btn-edit')) {
        const button = target.closest('.btn-edit') as HTMLElement;
        const taller: Taller = {
          id: parseInt(button.dataset['id'] || '0'),
          descripcion: button.dataset['descripcion'] || '',
          activo: button.dataset['activo'] === 'true',
          asignado: button.dataset['asignado'] === 'true'
        };
        this.editarTaller(taller);
      }
      
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const id = parseInt(button.dataset['id'] || '0');
        this.eliminarTaller(id);
      }
    });
  }

  /**
   * Renderizar estado del taller
   */
  private renderEstado(activo: boolean): string {
    if (activo === true) {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
  }

  /**
   * Renderizar estado de asignación
   */
  private renderAsignado(asignado: boolean): string {
    if (asignado === true) {
      return '<span class="badge bg-info">ASIGNADO</span>';
    }
    return '<span class="badge bg-secondary">NO ASIGNADO</span>';
  }

  /**
   * Renderizar botones de acciones
   */
  private renderAcciones(row: Taller): string {
    return `
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary btn-edit" 
                data-id="${row.id}" 
                data-descripcion="${row.descripcion}"
                data-activo="${row.activo}"
                data-asignado="${row.asignado}"
                title="Editar">
          <i class="ri-edit-line"></i>
        </button>
        <button class="btn btn-sm btn-danger btn-delete" 
                data-id="${row.id}"
                data-descripcion="${row.descripcion}"
                title="Eliminar">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;
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
   * Abrir modal para crear taller
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.tallerForm.reset();
    this.tallerForm.patchValue({
      activo: true,
      asignado: false
    });
    this.modalRef = this.modalService.open(this.tallerModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Editar taller
   */
  editarTaller(tallerData: Taller | number): void {
    if (typeof tallerData === 'number') {
      // Si recibe un id, busca el taller por API
      this.tallerService.getTallerById(tallerData).subscribe({
        next: (response) => {
          if (response.success) {
            const taller = response.data as Taller;
            this.abrirModalEdicion(taller, tallerData);
          }
        },
        error: (error) => {
          console.error('Error al obtener taller:', error);
          this.mostrarError('Error al cargar los datos del taller');
        }
      });
    } else if (tallerData.id) {
      // Si recibe un objeto Taller directamente y tiene id válido
      this.abrirModalEdicion(tallerData, tallerData.id);
    } else {
      this.mostrarError('Error: ID del taller no válido');
    }
  }

  /**
   * Abrir modal de edición con datos del taller
   */
  private abrirModalEdicion(taller: Taller, id: number): void {
    this.editMode = true;
    this.currentEditId = id;
    this.tallerForm.patchValue({
      descripcion: taller.descripcion,
      activo: taller.activo,
      asignado: taller.asignado
    });
    this.modalRef = this.modalService.open(this.tallerModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Eliminar taller
   */
  eliminarTaller(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea eliminar este taller?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.tallerService.eliminarTaller(id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'El taller ha sido eliminado correctamente',
                timer: 2000,
                showConfirmButton: false
              });
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'No se pudo eliminar el taller');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al eliminar taller:', error);
            this.mostrarError('No se pudo eliminar el taller');
          }
        });
      }
    });
  }

  /**
   * Cerrar modal
   */
  cerrarModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
    this.tallerForm.reset();
    this.editMode = false;
    this.currentEditId = null;
  }

  /**
   * Validar si un campo es inválido
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.tallerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Enviar formulario
   */
  onSubmit(): void {
    if (this.tallerForm.valid) {
      const formData = this.tallerForm.value;
      this.loading = true;

      const tallerData: Taller = {
        id: this.editMode && this.currentEditId ? this.currentEditId : undefined,
        descripcion: formData.descripcion,
        activo: formData.activo,
        asignado: formData.asignado
      };

      if (this.editMode && this.currentEditId) {
        // Actualizar taller existente
        this.tallerService.actualizarTaller(this.currentEditId, tallerData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.mostrarExito('Taller actualizado correctamente');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'Error al actualizar el taller');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al actualizar taller:', error);
            this.mostrarError('Error al actualizar el taller');
          }
        });
      } else {
        // Crear nuevo taller
        this.tallerService.crearTaller(tallerData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.mostrarExito('Taller creado correctamente');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'Error al crear el taller');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al crear taller:', error);
            this.mostrarError('Error al crear el taller');
          }
        });
      }
    }
  }

  /**
   * Mostrar mensaje de éxito
   */
  private mostrarExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
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
      text: mensaje
    });
  }
}

// Exponer la instancia globalmente para los botones de DataTable
declare global {
  interface Window {
    tallerComponent: any;
  }
}