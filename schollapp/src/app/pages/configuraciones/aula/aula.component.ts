import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Aula } from '../../../core/models/aula.model';
import { AulaService } from '../../../core/services/aula.service';
import { Local } from '../../../core/models/local.model';
import { LocalService } from '../../../core/services/local.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
  standalone: false
})
export class AulaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('aulaModal', { static: true })
  aulaModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  aulaForm: FormGroup;
  
  // Data properties
  aulas: Aula[] = [];
  locales: Local[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: number | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly aulaService: AulaService,
    private readonly localService: LocalService,
    private readonly modalService: NgbModal
  ) {
    this.aulaForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.configurarDataTables();
    this.cargarLocales();
    this.cargarAulas();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      idLocal: ['', [Validators.required]],
      descripcionAula: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
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
        this.aulaService.listarAulas().subscribe({
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
          data: 'localDescripcion'
        },
        {
          title: 'Descripción Aula',
          data: 'descripcionAula'
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
          render: (data: any, type: any, row: Aula) => {
            return `
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary btn-edit" 
                        data-id="${row.id}" 
                        data-idlocal="${row.idLocal}"
                        data-descripcionaula="${row.descripcionAula}"
                        data-descripcion="${row.descripcion}"
                        data-activo="${row.activo}">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" 
                        data-id="${row.id}"
                        data-descripcionaula="${row.descripcionAula}">
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
        const aula: Aula = {
          id: parseInt(button.dataset['id'] || '0'),
          idLocal: parseInt(button.dataset['idlocal'] || '0'),
          descripcionAula: button.dataset['descripcionaula'] || '',
          descripcion: button.dataset['descripcion'] || '',
          activo: button.dataset['activo'] === 'true'
        };
        this.editarAula(aula);
      }
      
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const aula: Aula = {
          id: parseInt(button.dataset['id'] || '0'),
          descripcionAula: button.dataset['descripcionaula'] || '',
          descripcion: '',
          activo: true
        };
        this.eliminarAula(aula);
      }
    });
  }

  /**
   * Renderizar estado del aula
   */
  private renderEstado(activo: boolean): string {
    if (activo === true) {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
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
      }
    });
  }

  /**
   * Cargar aulas
   */
  private cargarAulas(): void {
    this.loading = true;
    this.aulaService.listarAulas().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.aulas = response.data as Aula[] || [];
          this.recargarDataTable();
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al cargar aulas:', error);
        this.mostrarError('Error al cargar las aulas');
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
   * Abrir modal para crear aula
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.aulaForm.reset();
    this.aulaForm.patchValue({ activo: true });
    this.modalRef = this.modalService.open(this.aulaModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Editar aula
   */
  editarAula(aula: Aula): void {
    this.editMode = true;
    this.currentEditId = aula.id!;
    this.aulaForm.patchValue({
      idLocal: aula.idLocal,
      descripcionAula: aula.descripcionAula,
      descripcion: aula.descripcion,
      activo: aula.activo
    });
    this.modalRef = this.modalService.open(this.aulaModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Verificar si un campo es inválido
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.aulaForm.get(fieldName);
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
    if (this.aulaForm.valid) {
      const aulaData = this.aulaForm.value;
      
      if (this.editMode) {
        this.actualizarAula(aulaData);
      } else {
        this.crearAula(aulaData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Crear nueva aula
   */
  private crearAula(aulaData: any): void {
    this.loading = true;
    this.aulaService.crearAula(aulaData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Aula creada exitosamente');
          this.cerrarModal();
          this.cargarAulas();
        } else {
          this.mostrarError(response.message || 'Error al crear el aula');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al crear aula:', error);
        this.mostrarError('Error al crear el aula');
      }
    });
  }

  /**
   * Actualizar aula existente
   */
  private actualizarAula(aulaData: any): void {
    if (!this.currentEditId) return;
    
    this.loading = true;
    const updateData = { ...aulaData, idAula: this.currentEditId };
    
    this.aulaService.actualizarAula(this.currentEditId, updateData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Aula actualizada exitosamente');
          this.cerrarModal();
          this.cargarAulas();
        } else {
          this.mostrarError(response.message || 'Error al actualizar el aula');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al actualizar aula:', error);
        this.mostrarError('Error al actualizar el aula');
      }
    });
  }

  /**
   * Eliminar aula
   */
  eliminarAula(aula: Aula): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el aula "${aula.descripcionAula}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && aula.id) {
        this.ejecutarEliminacion(aula.id);
      }
    });
  }

  /**
   * Ejecutar eliminación
   */
  private ejecutarEliminacion(id: number): void {
    this.loading = true;
    this.aulaService.eliminarAula(id).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Aula eliminada exitosamente');
          this.cargarAulas();
        } else {
          this.mostrarError(response.message || 'Error al eliminar el aula');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al eliminar aula:', error);
        this.mostrarError('Error al eliminar el aula');
      }
    });
  }

  /**
   * Marcar campos del formulario como tocados
   */
  private markFormGroupTouched(): void {
    Object.keys(this.aulaForm.controls).forEach(key => {
      this.aulaForm.get(key)?.markAsTouched();
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