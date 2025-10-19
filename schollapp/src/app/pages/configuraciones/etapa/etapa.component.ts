import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Etapa } from '../../../core/models/etapa.model';
import { EtapaService } from '../../../core/services/etapa.service';
import { LocalService } from '../../../core/services/local.service';
import { Local } from '../../../core/models/local.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss'],
  standalone: false
})
export class EtapaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('etapaModal', { static: true })
  etapaModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  etapaForm: FormGroup;
  
  // Data properties
  etapas: Etapa[] = [];
  locales: Local[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: number | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly etapaService: EtapaService,
    private readonly localService: LocalService,
    private readonly modalService: NgbModal
  ) {
    this.etapaForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.configurarDataTables();
    this.cargarLocales();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    // Configurar la referencia global después de la inicialización
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.etapaComponent = this;
      }
    }, 100);
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
      idLocal: ['', [Validators.required]],
      descripcionEtapa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
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
        this.etapaService.listarEtapas().subscribe({
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
          title: 'Local',
          data: 'local.descripcion'
        },
        {
          title: 'Descripción Etapa',
          data: 'descripcionEtapa'
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
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Etapa) => this.renderAcciones(row)
        }
      ]
    };
  }

  /**
   * Renderizar estado de la etapa
   */
  private renderEstado(activo: boolean): string {
    if (activo === true) {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
  }

  /**
   * Renderizar botones de acciones
   */
  private renderAcciones(row: Etapa): string {
    return `
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary" 
                onclick="window.etapaComponent.editarEtapa(${row.id})"
                title="Editar">
          <i class="ri-edit-line"></i>
        </button>
        <button class="btn btn-sm btn-danger" 
                onclick="window.etapaComponent.eliminarEtapa(${row.id})"
                title="Eliminar">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;
  }

  /**
   * Cargar locales para el dropdown
   */
  private cargarLocales(): void {
    this.localService.listarLocales().subscribe({
      next: (response) => {
        if (response.success) {
          this.locales = response.data as Local[] || [];
        }
      },
      error: (error) => {
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
   * Abrir modal para crear etapa
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.etapaForm.reset();
    this.etapaForm.patchValue({
      activo: true
    });
    this.modalRef = this.modalService.open(this.etapaModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Editar etapa
   */
  editarEtapa(id: number): void {
    this.etapaService.getEtapaById(id).subscribe({
      next: (response) => {
        if (response.success) {
          const etapa = response.data as Etapa;
          this.editMode = true;
          this.currentEditId = id;
          this.etapaForm.patchValue({
            idLocal: etapa.localId || etapa.local?.id,
            descripcionEtapa: etapa.descripcionEtapa,
            descripcion: etapa.descripcion,
            activo: etapa.activo
          });
          this.modalRef = this.modalService.open(this.etapaModalTemplate, {
            size: 'lg',
            centered: true,
            backdrop: 'static'
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener etapa:', error);
        this.mostrarError('Error al cargar los datos de la etapa');
      }
    });
  }

  /**
   * Eliminar etapa
   */
  eliminarEtapa(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea eliminar esta etapa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.etapaService.eliminarEtapa(id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'La etapa ha sido eliminada correctamente',
                timer: 2000,
                showConfirmButton: false
              });
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'No se pudo eliminar la etapa');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al eliminar etapa:', error);
            this.mostrarError('No se pudo eliminar la etapa');
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
    this.etapaForm.reset();
    this.editMode = false;
    this.currentEditId = null;
  }

  /**
   * Validar si un campo es inválido
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.etapaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Enviar formulario
   */
  onSubmit(): void {
    if (this.etapaForm.valid) {
      const formData = this.etapaForm.value;
      this.loading = true;

      const etapaData: Etapa = {
        id: this.editMode && this.currentEditId ? this.currentEditId : undefined,
        localId: Number(formData.idLocal),
        descripcionEtapa: formData.descripcionEtapa,
        descripcion: formData.descripcion,
        activo: formData.activo
      };

      if (this.editMode && this.currentEditId) {
        // Actualizar etapa existente
        this.etapaService.actualizarEtapa(this.currentEditId, etapaData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.mostrarExito('Etapa actualizada correctamente');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'Error al actualizar la etapa');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al actualizar etapa:', error);
            this.mostrarError('Error al actualizar la etapa');
          }
        });
      } else {
        // Crear nueva etapa
        this.etapaService.crearEtapa(etapaData).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.mostrarExito('Etapa creada correctamente');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              this.mostrarError(response.message || 'Error al crear la etapa');
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al crear etapa:', error);
            this.mostrarError('Error al crear la etapa');
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
    etapaComponent: any;
  }
}