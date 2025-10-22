import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Grupo } from '../../../core/models/grupo.model';
import { GrupoService } from '../../../core/services/grupo.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

declare const bootstrap: any;

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  standalone: false,
})
export class GrupoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  @ViewChild('grupoModal', { static: true })
  grupoModalTemplate!: TemplateRef<any>;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Form
  grupoForm: FormGroup;
  
  // Data properties
  grupos: Grupo[] = [];
  loading = false;
  
  // Edit properties
  editMode = false;
  currentEditId: string | null = null;
  
  // Modal instance
  private modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly grupoService: GrupoService,
    private readonly modalService: NgbModal
  ) {
    this.grupoForm = this.initializeForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit: Iniciando componente...');
    this.configurarDataTables();
   }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
      // Cargar grupos después de que DataTables esté inicializado
      setTimeout(() => {
        if (typeof window !== 'undefined') {
    (window as any).grupoComponent = this;
        }
      }, 100);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
     if (this.modalRef) {
      this.modalRef.close();
    }
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      edad1: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      edad2: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      descripcionGrupo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      activo: [true, [Validators.required]]
    });
  }

  validarRangoEdades(): void {
    const edad1 = this.grupoForm.get('edad1')?.value;
    const edad2 = this.grupoForm.get('edad2')?.value;

      if (edad1 != null && edad2 != null && edad1 > edad2) {
        Swal.fire({
          icon: 'warning',
          title: 'Rango de edades inválido',
          text: 'La edad inicial no puede ser mayor que la edad final.',
          confirmButtonColor: '#3085d6'
        });

      } else {
        this.grupoForm.controls['descripcionGrupo'].setValue(`DE ${edad1} A ${edad2} AÑOS`);
      }
  }


  /**
   * Configurar DataTables
   */
  private configurarDataTables(): void {
    console.log('configurarDataTables: Configurando DataTables...');
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
        this.grupoService.listarGrupos().subscribe({
          next: (response) => {
            // Si la respuesta es un array directamente
            if (response.success && Array.isArray(response.data)) {
                callback({
                    recordsTotal: response.data.length,
                    recordsFiltered: response.data.length,
                    data: response.data
                });
            }  else {
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
          data: 'idGrupo',
          width: '80px'
        },
        {
          title: 'Descripción',
          data: 'descripcionGrupo',
          width: '70%'
        },
        {
          title: 'Estado',
          data: 'activo',
          width: '20%',
          render: (activo: number) => this.renderEstado(activo)
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Grupo) => this.renderAcciones(row)
        }
      ]
    };

 
  }
  
  /**
   * Renderizar estado del grupo
   */
  private renderEstado(activo: any): string {
    if (activo === "true") {
      return '<span class="badge bg-success">ACTIVO</span>';
    }
    return '<span class="badge bg-danger">INACTIVO</span>';
  }

    private renderAcciones(row: Grupo): string {
      return `
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-primary" 
                  onclick="window.grupoComponent.editarGrupo(${row.idGrupo})"
                  title="Editar">
            <i class="ri-edit-line"></i>
          </button>
          <button class="btn btn-sm btn-danger" 
                  onclick="window.grupoComponent.eliminarGrupo(${row.idGrupo})"
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
   * Abrir modal para crear grupo
   */
  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.grupoForm.reset();
    this.grupoForm.patchValue({ activo: true });
    this.modalRef = this.modalService.open(this.grupoModalTemplate, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    });
  }

  /**
   * Editar grupo
   */
  editarGrupo(idGrupo: number): void {

    this.grupoService.obtenerGrupo(idGrupo).subscribe({
      next: (response) => {
        if (response.success) {
          const grupo = response.data as Grupo;
          this.editMode = true;
          this.currentEditId = grupo.idGrupo || null;
          this.grupoForm.patchValue({
            descripcionGrupo: grupo.descripcionGrupo,
            edad1: grupo.edad1,
            edad2: grupo.edad2,
            activo: grupo.activo
          });
          this.modalRef = this.modalService.open(this.grupoModalTemplate, {
            size: 'lg',
            centered: true,
            backdrop: 'static'
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener grupo:', error);
        this.mostrarError('Error al cargar los datos del grupo');
      }
    });

  }

  /**
   * Eliminar grupo
   */
  eliminarGrupo(idGrupo: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el grupo ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && idGrupo) {
        this.loading = true;
        this.grupoService.eliminarGrupo(idGrupo).subscribe({
          next: () => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El grupo ha sido eliminado correctamente',
              timer: 2000,
              showConfirmButton: false
            });
            this.recargarDataTable();
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al eliminar grupo:', error);
            this.mostrarError('No se pudo eliminar el grupo');
          }
        });
      }
    });
  }

  /**
   * Verificar si un campo es inválido
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.grupoForm.get(fieldName);
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
   * Enviar formulario - Lógica del botón Guardar
   */
  onSubmit(): void {
    if (this.grupoForm.valid) {
      const grupoData = this.grupoForm.value;
      this.loading = true;

      if (this.editMode && this.currentEditId) {
        // Actualizar grupo existente
        this.grupoService.actualizarGrupo(this.currentEditId, grupoData).subscribe({
          next: () => {
            this.loading = false;
            this.mostrarExito('Grupo actualizado correctamente');
            this.cerrarModal();
            this.recargarDataTable();
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al actualizar grupo:', error);
            this.mostrarError('Error al actualizar el grupo');
          }
        });
      } else {
        // Crear nuevo grupo
        this.grupoService.crearGrupo(grupoData).subscribe({
          next: () => {
            this.loading = false;
            this.mostrarExito('Grupo creado correctamente');
            this.cerrarModal();
            this.recargarDataTable();
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al crear grupo:', error);
            this.mostrarError('Error al crear el grupo');
          }
        });
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.grupoForm.controls).forEach(key => {
        const control = this.grupoForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
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
      timerProgressBar: true,
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
      confirmButtonColor: '#3085d6'
    });
  }
}
