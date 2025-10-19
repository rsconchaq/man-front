import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { DocenteService } from '../../../core/services/docente.service';
import { Docente } from '../../../core/models/docente.model';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'] ,
  standalone: false,
})
export class DocenteComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  @ViewChild('docenteModal', { static: true }) docenteModalTemplate!: TemplateRef<any>;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  docenteForm: FormGroup;
  loading = false;
  editMode = false;
  currentEditId: number | null = null;
  modalRef: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly docenteService: DocenteService,
    private readonly modalService: NgbModal
  ) {
    this.docenteForm = this.formBuilder.group({
      codigo: [''],
      documentoIdentidad: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      gradoEstudio: [''],
      ciudad: [''],
      direccion: [''],
      email: [''],
      numeroTelefonico: [''],
      estado: ['Activo']
    });
  }

  ngOnInit(): void {
    this.configurarDataTables();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  configurarDataTables(): void {
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
        loadingRecords: 'Cargando...',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        paginate: {
          first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Último'
        }
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        this.docenteService.listarDocentes().subscribe({
          next: (response) => {
            let docentesArray = [];
            if (Array.isArray(response)) {
              docentesArray = response;
            } else if (response && Array.isArray(response.data)) {
              docentesArray = response.data;
            }
            callback({
              recordsTotal: docentesArray.length,
              recordsFiltered: docentesArray.length,
              data: docentesArray
            });
          },
          error: () => {
            callback({ recordsTotal: 0, recordsFiltered: 0, data: [] });
          }
        });
      },
      columns: [
        { title: 'Código', data: 'codigo' },
        { title: 'Documento Identidad', data: 'documentoIdentidad' },
        { title: 'Nombres', data: 'nombres' },
        { title: 'Apellidos', data: 'apellidos' },
        { title: 'Fecha Nacimiento', data: 'fechaNacimiento' },
        { title: 'Sexo', data: 'sexo' },
        { title: 'Grado Estudio', data: 'gradoEstudio' },
        { title: 'Ciudad', data: 'ciudad' },
        { title: 'Dirección', data: 'direccion' },
        { title: 'Email', data: 'email' },
        { title: 'Número Telefónico', data: 'numeroTelefonico' },
        { title: 'Estado', data: 'estado' },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Docente) => this.renderAcciones(row)
        }
      ]
    };

    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.btn-edit')) {
        const button = target.closest('.btn-edit') as HTMLElement;
        const id = button.getAttribute('data-id');
        if (id) this.editarDocente(Number(id));
      }
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const id = button.getAttribute('data-id');
        if (id) this.eliminarDocente(Number(id));
      }
    });
  }

  renderAcciones(row: Docente): string {
    return `
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary btn-edit" data-id="${row.idDocente}" title="Editar">
          <i class="ri-edit-line"></i>
        </button>
        <button class="btn btn-sm btn-danger btn-delete" data-id="${row.idDocente}" title="Eliminar">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;
  }

  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.docenteForm.reset();
    this.modalRef = this.modalService.open(this.docenteModalTemplate, {
      size: 'xl', centered: true, backdrop: 'static'
    });
  }

  editarDocente(id: number): void {
    this.docenteService.obtenerDocente(id).subscribe({
      next: (response) => {
        if (response.success) {
          const docente = response.data as Docente;
          this.editMode = true;
          this.currentEditId = id;
          this.docenteForm.patchValue(docente);
          this.modalRef = this.modalService.open(this.docenteModalTemplate, {
            size: 'xl', centered: true, backdrop: 'static'
          });
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el docente', 'error');
      }
    });
  }

  eliminarDocente(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea eliminar este docente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.docenteService.eliminarDocente(id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Eliminado', 'El docente ha sido eliminado correctamente', 'success');
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'No se pudo eliminar el docente', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'No se pudo eliminar el docente', 'error');
          }
        });
      }
    });
  }

  recargarDataTable(): void {
    if (this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      });
    }
  }

  cerrarModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
    this.docenteForm.reset();
    this.editMode = false;
    this.currentEditId = null;
  }

  onSubmit(): void {
    if (this.docenteForm.valid) {
      this.loading = true;
      const formData = this.docenteForm.value;
      const docente: Docente = {
        idDocente: this.editMode && this.currentEditId ? this.currentEditId : undefined,
        codigo: formData.codigo,
        documentoIdentidad: formData.documentoIdentidad,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        fechaNacimiento: formData.fechaNacimiento,
        sexo: formData.sexo,
        gradoEstudio: formData.gradoEstudio,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        email: formData.email,
        numeroTelefonico: formData.numeroTelefonico,
        estado: formData.estado
      };
      if (this.editMode && this.currentEditId) {
        this.docenteService.actualizarDocente(this.currentEditId, docente).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Actualizado', 'Docente actualizado correctamente', 'success');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'Error al actualizar el docente', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'Error al actualizar el docente', 'error');
          }
        });
      } else {
        this.docenteService.crearDocente(docente).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Creado', 'Docente creado correctamente', 'success');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'Error al crear el docente', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'Error al crear el docente', 'error');
          }
        });
      }
    }
  }
}
