   
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { AlumnoService } from '../../../core/services/alumno.service';
import { ApoderadoService } from '../../../core/services/apoderado.service';
import { Alumno } from '../../../core/models/alumno.model';
import { Apoderado } from '../../../core/models/apoderado.model';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TallerService } from 'src/app/core/services/taller.service';



export interface Cronograma  { 
      anio: string,
      mes: string,
      titulo: string,
      horarios: Array<{
          idTallerApertura: number,
          hora: string,
          color: string,
          bloques: Array<{ centro: string, fechas: string, semanas: string[] }>
      }>
  }



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModalModule,
     
  ]
})
export class AlumnoComponent implements OnInit, AfterViewInit {
  filtroAnio: string = '';
  filtroMes: string = '';
  aniosDisponibles: string[] = [];
  mesesDisponibles: string[] = [];
  data: Cronograma[] = [];
  ngOnInit(): void {
    this.configurarDataTables();
    this.listarAlumnosDebug();
    
    // Extraer años de las fechas de los bloques
   
  }
  apoderadosAlumno: any[] = [];
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }
  alumnosDebug: Alumno[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  @ViewChild('alumnoModal', { static: true }) alumnoModalTemplate!: TemplateRef<any>;
  @ViewChild('listaTalleresMes', { static: true }) listaTalleresMesTemplate!: TemplateRef<any>;
  @ViewChild('matriculaTaller', { static: true }) matriculaTallerTemplate!: TemplateRef<any>;
  
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  alumnoForm: FormGroup;
  activeTab: string = 'alumno';
  loading = false;
  editMode = false;
  currentEditId: number | null = null;
  modalRef: any;

  datosTallerSelected :any;
  datosAlumnoSelected : any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alumnoService: AlumnoService,
    private readonly apoderadoService: ApoderadoService,
    private readonly tallerService: TallerService,
    private readonly modalService: NgbModal
  ) {
    this.alumnoForm = this.formBuilder.group({
      codigo: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      ciudad: [''],
      direccion: [''],
      edad: [''],
      diagnostico: [''],
      observacion: [''],
      // Apoderado principal
      apoderadoPrincipal_documentoIdentidad: [''],
      apoderadoPrincipal_nombres: [''],
      apoderadoPrincipal_apellidos: [''],
      apoderadoPrincipal_tipoRelacion: [''],
      apoderadoPrincipal_telefono1: [''],
      apoderadoPrincipal_telefono2: [''],
      apoderadoPrincipal_correo: [''],
      // Apoderado secundario
      apoderadoSecundario_documentoIdentidad: [''],
      apoderadoSecundario_nombres: [''],
      apoderadoSecundario_apellidos: [''],
      apoderadoSecundario_tipoRelacion: [''],
      apoderadoSecundario_telefono1: [''],
      apoderadoSecundario_telefono2: [''],
      apoderadoSecundario_correo: ['']
    });
  }


  listarAlumnosDebug(): void {
    this.alumnoService.listarAlumnos().subscribe({
      next: (response) => {
        let alumnosArray = [];
        if (Array.isArray(response)) {
          alumnosArray = response;
        } else if (response && Array.isArray(response.data)) {
          alumnosArray = response.data;
        }
        this.alumnosDebug = alumnosArray;
        console.log('Alumnos debug:', alumnosArray);
      },
      error: () => {
        this.alumnosDebug = [];
      }
    });
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
        this.alumnoService.listarAlumnos().subscribe({
          next: (response) => {
            console.log('API alumno/listar response:', response);
            let alumnosArray = [];
            if (Array.isArray(response)) {
              alumnosArray = response;
            } else if (response && Array.isArray(response.data)) {
              alumnosArray = response.data;
            }
            callback({
              recordsTotal: alumnosArray.length,
              recordsFiltered: alumnosArray.length,
              data: alumnosArray
            });
          },
          error: () => {
            callback({ recordsTotal: 0, recordsFiltered: 0, data: [] });
          }
        });
      },
      columns: [
        { title: 'Código', data: 'codigo' },
        { title: 'Nombres', data: 'nombres' },
        { title: 'Apellidos', data: 'apellidos' },
        { title: 'Documento Identidad', data: 'documentoIdentidad' },
        { title: 'Fecha Nacimiento', data: 'fechaNacimiento' },
        { title: 'Sexo', data: 'sexo' },
        { title: 'Ciudad', data: 'ciudad' },
        { title: 'Dirección', data: 'direccion' },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: Alumno) => this.renderAcciones(row)
        }
      ]
    };
      // Ensure DataTable is triggered after configuration
      // Removed duplicate dtTrigger.next(null) call

    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.btn-edit')) {
        const button = target.closest('.btn-edit') as HTMLElement;
        const id = button.getAttribute('data-id');
        if (id) this.editarAlumno(Number(id));
      }
      if (target.closest('.btn-delete')) {
        const button = target.closest('.btn-delete') as HTMLElement;
        const id = button.getAttribute('data-id');
        if (id) this.eliminarAlumno(Number(id));
      }
      if (target.closest('.btn-matricula')) {
        const button = target.closest('.btn-matricula') as HTMLElement;
        const id = button.getAttribute('data-id');
        if (id) this.cronogramaTaller(Number(id));
      }
    });
  }

  renderAcciones(row: Alumno): string {
    return `
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary btn-edit" data-id="${row.idAlumno}" title="Editar">
          <i class="ri-edit-line"></i>
        </button>
        <button class="btn btn-sm btn-danger btn-delete" data-id="${row.idAlumno}" title="Eliminar">
          <i class="ri-delete-bin-line"></i>
        </button>
        <button class="btn btn-sm btn-info btn-matricula" data-id="${row.idAlumno}" title="Matricular">
          <i class="ri-add-line"></i>
        </button>
      </div>
    `;
  }

  abrirModalNuevo(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.alumnoForm.reset();
    this.activeTab = 'alumno';
    this.modalRef = this.modalService.open(this.alumnoModalTemplate, {
      size: 'xl', centered: true, backdrop: 'static'
    });
  }

  editarAlumno(id: number): void {
    this.alumnoService.obtenerAlumno(id).subscribe({
      next: (response) => {
        if (response.success) {
          const alumno = response.data as Alumno;
          this.editMode = true;
          this.currentEditId = id;
          this.alumnoForm.patchValue(alumno);
          // Si tiene apoderados, cargar datos en el formulario
           // Si tiene apoderados, cargar todos en la variable apoderadosAlumno
           if (Array.isArray(alumno['apoderados'])) {
             this.apoderadosAlumno = alumno['apoderados'];
             console.log('Apoderados del alumno:', alumno['apoderados']);
           } else {
             this.apoderadosAlumno = [];
             console.log('No hay apoderados en el alumno');
           }
           // Mantener compatibilidad con apoderadoPrincipal y apoderadoSecundario
           if (alumno['apoderados']) {
             this.alumnoForm.patchValue({
               apoderadoPrincipal_documentoIdentidad: alumno['apoderados'][0].documentoIdentidad,
               apoderadoPrincipal_nombres: alumno['apoderados'][0].nombres,
               apoderadoPrincipal_apellidos: alumno['apoderados'][0].apellidos,
               apoderadoPrincipal_tipoRelacion: alumno['apoderados'][0].tipoRelacion,
               apoderadoPrincipal_telefono1: alumno['apoderados'][0].telefono1,
               apoderadoPrincipal_telefono2: alumno['apoderados'][0].telefono2,
               apoderadoPrincipal_correo: alumno['apoderados'][0].correo
             });
           }
           if (alumno['apoderados']) {
             this.alumnoForm.patchValue({
               apoderadoSecundario_documentoIdentidad: alumno['apoderados'][1   ].documentoIdentidad,
               apoderadoSecundario_nombres: alumno['apoderados'][1].nombres,
               apoderadoSecundario_apellidos: alumno['apoderados'][1].apellidos,
               apoderadoSecundario_tipoRelacion: alumno['apoderados'][1].tipoRelacion,
               apoderadoSecundario_telefono1: alumno['apoderados'][1].telefono1,
               apoderadoSecundario_telefono2: alumno['apoderados'][1].telefono2,
               apoderadoSecundario_correo: alumno['apoderados'][1].correo
             });
           }
          this.activeTab = 'alumno';
          this.modalRef = this.modalService.open(this.alumnoModalTemplate, {
            size: 'xl', centered: true, backdrop: 'static'
          });
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el alumno', 'error');
      }
    });
  }

  eliminarAlumno(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea eliminar este alumno?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.alumnoService.eliminarAlumno(id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Eliminado', 'El alumno ha sido eliminado correctamente', 'success');
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'No se pudo eliminar el alumno', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
          }
        });
      }
    });
  }

  cronogramaTaller(id: number): void {

     this.alumnoService.obtenerAlumno(id).subscribe({
      next: (response) => {
        this.datosAlumnoSelected = response.data;
            this.listarCalendarioTaller('2323','12');


        this.modalRef = this.modalService.open(this.listaTalleresMesTemplate, {
            size: 'xl', centered: true, backdrop: 'static'
          });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el cronograma del taller', 'error');
      }
    });


  }

  redireccionarMatricula( id:any): void {

    this.tallerService.obtenerAperturaTallerId(id).subscribe({
      next: (response) => {
        this.datosTallerSelected = response.data;
        //setear al matriculaTaller
        console.log('Datos taller seleccionado:', this.datosTallerSelected);
        this.modalRef = this.modalService.open(this.matriculaTallerTemplate, {
          size: 'xl', centered: true, backdrop: 'static'
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la matrícula del taller', 'error');
      }
    });
  }
  


  redireccionarAnterior(){
     if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
      this.limpiarAperturaTallerSeleccionado();
    }

  }

  recargarDataTable(): void {
    if (this.dtElement) {
      void this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      });
    }
  }

  cerrarModal(): void {

    console.log('Modal Reference:', this.modalRef);

    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
      this.limpiarAperturaTallerSeleccionado();
    }

  }

  cerrarModalCronograma(): void {
    this.modalService.dismissAll();
    this.limpiarAperturaTallerSeleccionado();
    this.limpiarAlumnoSeleccionado();
   }

  registrarMatricula(): void {
   let body= {
     idMatricula: 0,
     codigo: "",
     situacion: "INSCRITO",
     idAperturaTaller: this.datosTallerSelected.idAperturaTaller,
     idAlumno: this.datosAlumnoSelected.idAlumno,
     idApoderado: this.datosAlumnoSelected.apoderados[0].idApoderado,
     idApoderado2: this.datosAlumnoSelected.apoderados[1].idApoderado,
     tipo: "0",
    activo: 1
}
    if(this.datosTallerSelected.idAperturaTaller && this.datosAlumnoSelected.idAlumno){
        this.modalRef.close();
       this.tallerService.registrarMatricula(body).subscribe({
        next: (response) => {
          if(response.success){
            Swal.fire('Matrícula Registrada', 'La matrícula ha sido registrada correctamente', 'success');
          } else {
            Swal.fire('Error', response.message || 'No se pudo registrar la matrícula', 'error');
          }
        },
        error: () => {
          Swal.fire('Error', 'No se pudo registrar la matrícula', 'error');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      this.loading = true;
      const formData = this.alumnoForm.value;
      const alumno: Alumno = {
        idAlumno: this.editMode && this.currentEditId ? this.currentEditId : undefined,
        codigo: formData.codigo,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        documentoIdentidad: formData.documentoIdentidad,
        fechaNacimiento: formData.fechaNacimiento,
        sexo: formData.sexo,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        edad: formData.edad,
        diagnostico: formData.diagnostico,
        observacion: formData.observacion
      };
      // Apoderados
      const apoderados: Apoderado[] = [
        {
            idApoderado: this.editMode && this.apoderadosAlumno[0] ? this.apoderadosAlumno[0].idApoderado : undefined,
          documentoIdentidad: formData.apoderadoPrincipal_documentoIdentidad,
          nombres: formData.apoderadoPrincipal_nombres,
          apellidos: formData.apoderadoPrincipal_apellidos,
          tipoRelacion: formData.apoderadoPrincipal_tipoRelacion,
          telefono1: formData.apoderadoPrincipal_telefono1,
          telefono2: formData.apoderadoPrincipal_telefono2,
          correo: formData.apoderadoPrincipal_correo
        },
        {
            idApoderado: this.editMode && this.apoderadosAlumno[1] ? this.apoderadosAlumno[1].idApoderado : undefined,
          documentoIdentidad: formData.apoderadoSecundario_documentoIdentidad,
        nombres: formData.apoderadoSecundario_nombres,
        apellidos: formData.apoderadoSecundario_apellidos,
        tipoRelacion: formData.apoderadoSecundario_tipoRelacion,
        telefono1: formData.apoderadoSecundario_telefono1,
        telefono2: formData.apoderadoSecundario_telefono2,
        correo: formData.apoderadoSecundario_correo
      }
    ];
      // Enviar datos al API
      if (this.editMode && this.currentEditId) {
        this.alumnoService.actualizarAlumno(this.currentEditId, { ...alumno, apoderados }).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Actualizado', 'Alumno actualizado correctamente', 'success');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'Error al actualizar el alumno', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'Error al actualizar el alumno', 'error');
          }
        });
      } else {
        this.alumnoService.crearAlumno({ ...alumno, apoderados }).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              Swal.fire('Creado', 'Alumno creado correctamente', 'success');
              this.cerrarModal();
              this.recargarDataTable();
            } else {
              Swal.fire('Error', response.message || 'Error al crear el alumno', 'error');
            }
          },
          error: () => {
            this.loading = false;
            Swal.fire('Error', 'Error al crear el alumno', 'error');
          }
        });
      }
    }
  }

  onCalcularEdad(event:any){
    const fechaNacimiento = new Date(event.target.value);
    const hoy = new Date();
    if(fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())){
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
            edad--;
        }
        this.alumnoForm.patchValue({ edad });
    } else {
        this.alumnoForm.patchValue({ edad: '0' });
        this.alumnoForm.get('fechaNacimiento')?.setErrors({ invalid: true });
        this.alumnoForm.get('edad')?.setErrors({ invalid: true });  
    }
  }

  listarCalendarioTaller(anio: any, mes: any) {
  this.tallerService.listarCalendarioTaller(anio, mes).subscribe({
    next: (response) => {
      const agrupado: { [key: string]: any } = {};

      response.data.forEach((element: any) => {
        const anio = element[0];
        const mes = element[1];
        const titulo = element[1];
        const horarios = JSON.parse(element[2]);

        const key = `${anio}-${mes}`;
        if (!agrupado[key]) {
          agrupado[key] = {
            anio,
            mes,
            titulo,
            horarios: []
          };
        }
        agrupado[key].horarios = agrupado[key].horarios.concat(horarios);
      });

      this.data = Object.values(agrupado);

      // Inicializar meses y años disponibles
     this.mesesDisponibles = this.data.map(m => m.mes.toString());
     this.aniosDisponibles = this.data.map(m => m.anio.toString());
    //quitar duplicados
     this.aniosDisponibles = Array.from(new Set(this.aniosDisponibles));
     this.mesesDisponibles = Array.from(new Set(this.mesesDisponibles));
      console.log('Calendario de Taller agrupado:', this.data);
    },
    error: () => {
      Swal.fire('Error', 'Error al actualizar el alumno', 'error');
    }
  });
}

limpiarAperturaTallerSeleccionado(){
  this.datosTallerSelected = {
    descripcionEtapa: '',
    descripcionGrupo: '',
    descripcionTaller: '',
    descripcionLocal:'',
    total_vacantes:0,
    vacantes_disponible:0,
    fechaInicio: '',
    fechaFin: ''
  };
}

limpiarAlumnoSeleccionado(){
  this.datosAlumnoSelected = {
    documentoIdentidad: '',
    nombres: '',
    apellidos : '',
    fechaNacimiento : '',
    sexo : '',
  }
}
}
