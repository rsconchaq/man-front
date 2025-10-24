   
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
import { ExternalApiService } from 'src/app/core/services/externalApi.service';
 


export interface Aula {
  nombreAula: string;
  talleres: TallerDetalle[];
}

export interface TallerDetalle {
  idTallerApertura: number;
  nombreTaller: string;
  profesor: string;
  rangoFechas: string;
  etapa: string;
  curso: string;
  cursoCorto: string;
  rangoEdad: string;
  diaSemana: string;
  local?: string;
  nombreLocal?: string;
  matriculados: number;
  disponibles : number;
  libres: number;
  totalVacantes: number;
  horaInicio: string;
  horaFin: string;
  color?: string;
}

export interface HorarioRow {
  horario: string; // Ej: "9AM A 11AM"
  horaInicio: string;
  horaFin: string;
  aulas: Aula[];
}

export interface CalendarioMes {
  anio: string;
  mes: string;
  titulo: string;
  horarios: HorarioRow[];
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
  filtroLocal: string = '';
  filtroDiaSemana: string = '';
  filtroEtapa: string = '';
  filtroRangoEdad: string = '';
  filtroTaller: string = '';
  filtroCurso: string = '';
  
  aniosDisponibles: string[] = [];
  mesesDisponibles: string[] = [];
  localesDisponibles: string[] = [];
  diasSemanaDisponibles: string[] = [];
  etapasDisponibles: string[] = [];
  cursosDisponibles: string[] = [];
  rangoEdadDisponibles: string[] = [];
  talleresDisponibles: string[] = [];
  
  data: CalendarioMes[] = [];
  dataOriginal: CalendarioMes[] = []; // Para mantener los datos sin filtrar
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
    private readonly externalApiService: ExternalApiService,
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
      apoderadoPrincipal_documentoIdentidad: ['', Validators.required],
      apoderadoPrincipal_nombres: ['', Validators.required],
      apoderadoPrincipal_apellidos: ['', Validators.required],
      apoderadoPrincipal_tipoRelacion: ['', Validators.required],
      apoderadoPrincipal_telefono1: ['', Validators.required],
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

    const idTipoMatricula = (document.getElementById('idTipoMatricula') as HTMLSelectElement).value;
    const idPagoMatricula = (document.getElementById('idPagoMatricula') as HTMLSelectElement).value;

   let body= {
     idMatricula: 0,
     codigo: "",
     situacion: "INSCRITO",
     idAperturaTaller: this.datosTallerSelected.idAperturaTaller,
     idAlumno: this.datosAlumnoSelected.idAlumno,
     idApoderado: this.datosAlumnoSelected.apoderados[0].idApoderado,
     idApoderado2: this.datosAlumnoSelected.apoderados[1].idApoderado,
     tipo: idTipoMatricula,
     pago: idPagoMatricula,
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

    this.alumnoForm.markAllAsTouched();

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

      Swal.fire({
        title : this.editMode ? 'Actualizando alumno...' : 'Creando alumno...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });

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

  onDocumentoIdentidadFocusOut(TIPO:any){
    let documentoIdentidad = '';
    if(TIPO === 'ALUMNO'){
        documentoIdentidad = this.alumnoForm.get('documentoIdentidad')?.value;
    } else if(TIPO == 'APODERADO1'){
          documentoIdentidad = this.alumnoForm.get('apoderadoPrincipal_documentoIdentidad')?.value;
    } else if(TIPO == 'APODERADO2'){ 
            documentoIdentidad = this.alumnoForm.get('apoderadoSecundario_documentoIdentidad')?.value;
      }
    
    if(documentoIdentidad){
      Swal.fire({
        title : 'Consultando Información...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });
        this.externalApiService.obtenerApi(documentoIdentidad).subscribe({
          next: (response:any) => {
            Swal.close();
            if(response.success && response.data){
                console.log('Datos obtenidos de la API externa:', response.data);

                if(TIPO === 'ALUMNO'){
                  this.alumnoForm.controls['nombres'].setValue( response.data.first_name || '');
                  this.alumnoForm.controls['apellidos'].setValue( response.data.first_last_name + ' ' + response.data.second_last_name || '');
                              
                  } else if(TIPO == 'APODERADO1'){
                      this.alumnoForm.controls['apoderadoPrincipal_nombres'].setValue( response.data.first_name || '');
                      this.alumnoForm.controls['apoderadoPrincipal_apellidos'].setValue( response.data.first_last_name + ' ' + response.data.second_last_name || '');
                  }else if(TIPO == 'APODERADO2'){
                      this.alumnoForm.controls['apoderadoSecundario_nombres'].setValue( response.data.first_name || '');
                      this.alumnoForm.controls['apoderadoSecundario_apellidos'].setValue( response.data.first_last_name + ' ' + response.data.second_last_name || '');
                    }
                  }
          }
        });
    }
  }

  listarCalendarioTaller(anio: any, mes: any) {
  this.tallerService.listarCalendarioTaller(anio, mes).subscribe({
    next: (response) => {

      response.data = [
    [
      "2025",
      "SEPTIEMBRE",
      "[{\"idTallerApertura\":101,\"nombreTaller\":\"TEATRO INFANTIL\",\"descripcionTaller\":\"TEATRO INFANTIL\",\"local\":\"SAN MIGUEL\",\"nombreLocal\":\"SAN MIGUEL\",\"nombreAula\":\"AULA 1 - SAMIRA\",\"etapa\":\"CE\",\"descripcionEtapa\":\"CE\",\"rangoEdad\":\"5/7 AÑOS\",\"descripcionGrupo\":\"5/7 AÑOS\",\"diaSemana\":\"LUNES\",\"horaInicio\":\"09:00\",\"horaFin\":\"11:00\",\"fechaInicio\":\"2025-09-01\",\"fechaFin\":\"2025-09-30\",\"rangoFechas\":\"01 DE SEP - 30 DE SEP\",\"profesor\":\"MARIA GARCIA\",\"nombreProfesor\":\"MARIA GARCIA\",\"total_vacantes\":15,\"vacantes_disponible\":8,\"matriculados\":7,\"libres\":8},{\"idTallerApertura\":102,\"nombreTaller\":\"DANZA MODERNA\",\"descripcionTaller\":\"DANZA MODERNA\",\"local\":\"SAN MIGUEL\",\"nombreLocal\":\"SAN MIGUEL\",\"nombreAula\":\"AULA 1 - SAMIRA\",\"etapa\":\"HCE\",\"descripcionEtapa\":\"HCE\",\"rangoEdad\":\"8/10 AÑOS\",\"descripcionGrupo\":\"8/10 AÑOS\",\"diaSemana\":\"MARTES\",\"horaInicio\":\"11:00\",\"horaFin\":\"13:00\",\"fechaInicio\":\"2025-09-02\",\"fechaFin\":\"2025-09-30\",\"rangoFechas\":\"02 DE SEP - 30 DE SEP\",\"profesor\":\"CARMEN LOPEZ\",\"nombreProfesor\":\"CARMEN LOPEZ\",\"total_vacantes\":20,\"vacantes_disponible\":5,\"matriculados\":15,\"libres\":5},{\"idTallerApertura\":103,\"nombreTaller\":\"ARTE Y PINTURA\",\"descripcionTaller\":\"ARTE Y PINTURA\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"CE\",\"descripcionEtapa\":\"CE\",\"rangoEdad\":\"6/8 AÑOS\",\"descripcionGrupo\":\"6/8 AÑOS\",\"diaSemana\":\"MIERCOLES\",\"horaInicio\":\"09:00\",\"horaFin\":\"11:00\",\"fechaInicio\":\"2025-09-03\",\"fechaFin\":\"2025-09-30\",\"rangoFechas\":\"03 DE SEP - 30 DE SEP\",\"profesor\":\"JUAN MARTINEZ\",\"nombreProfesor\":\"JUAN MARTINEZ\",\"total_vacantes\":12,\"vacantes_disponible\":4,\"matriculados\":8,\"libres\":4},{\"idTallerApertura\":104,\"nombreTaller\":\"MÚSICA Y CANTO\",\"descripcionTaller\":\"MÚSICA Y CANTO\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"HCE\",\"descripcionEtapa\":\"HCE\",\"rangoEdad\":\"9/11 AÑOS\",\"descripcionGrupo\":\"9/11 AÑOS\",\"diaSemana\":\"JUEVES\",\"horaInicio\":\"13:30\",\"horaFin\":\"15:30\",\"fechaInicio\":\"2025-09-04\",\"fechaFin\":\"2025-09-30\",\"rangoFechas\":\"04 DE SEP - 30 DE SEP\",\"profesor\":\"ANA RODRIGUEZ\",\"nombreProfesor\":\"ANA RODRIGUEZ\",\"total_vacantes\":18,\"vacantes_disponible\":10,\"matriculados\":8,\"libres\":10},{\"idTallerApertura\":105,\"nombreTaller\":\"ROBÓTICA\",\"descripcionTaller\":\"ROBÓTICA\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"ACE\",\"descripcionEtapa\":\"ACE\",\"rangoEdad\":\"11/16 AÑOS\",\"descripcionGrupo\":\"11/16 AÑOS\",\"diaSemana\":\"VIERNES\",\"horaInicio\":\"16:30\",\"horaFin\":\"18:30\",\"fechaInicio\":\"2025-09-05\",\"fechaFin\":\"2025-09-30\",\"rangoFechas\":\"05 DE SEP - 30 DE SEP\",\"profesor\":\"PEDRO SANCHEZ\",\"nombreProfesor\":\"PEDRO SANCHEZ\",\"total_vacantes\":10,\"vacantes_disponible\":2,\"matriculados\":8,\"libres\":2}]"
    ],
    [
      "2025",
      "OCTUBRE",
      "[{\"idTallerApertura\":201,\"nombreTaller\":\"TEATRO AVANZADO\",\"descripcionTaller\":\"TEATRO AVANZADO\",\"local\":\"SAN MIGUEL\",\"nombreLocal\":\"SAN MIGUEL\",\"nombreAula\":\"AULA 1 - SAMIRA\",\"etapa\":\"CE\",\"descripcionEtapa\":\"CE\",\"rangoEdad\":\"5/7 AÑOS\",\"descripcionGrupo\":\"5/7 AÑOS\",\"diaSemana\":\"MIERCOLES\",\"horaInicio\":\"09:00\",\"horaFin\":\"11:00\",\"fechaInicio\":\"2025-10-01\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"01 DE OCT - 31 DE OCT\",\"profesor\":\"MARIA GARCIA\",\"nombreProfesor\":\"MARIA GARCIA\",\"total_vacantes\":15,\"vacantes_disponible\":6,\"matriculados\":9,\"libres\":6},{\"idTallerApertura\":202,\"nombreTaller\":\"BALLET CLÁSICO\",\"descripcionTaller\":\"BALLET CLÁSICO\",\"local\":\"SAN MIGUEL\",\"nombreLocal\":\"SAN MIGUEL\",\"nombreAula\":\"AULA 1 - SAMIRA\",\"etapa\":\"HCE\",\"descripcionEtapa\":\"HCE\",\"rangoEdad\":\"8/10 AÑOS\",\"descripcionGrupo\":\"8/10 AÑOS\",\"diaSemana\":\"JUEVES\",\"horaInicio\":\"11:00\",\"horaFin\":\"13:00\",\"fechaInicio\":\"2025-10-02\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"02 DE OCT - 31 DE OCT\",\"profesor\":\"CARMEN LOPEZ\",\"nombreProfesor\":\"CARMEN LOPEZ\",\"total_vacantes\":20,\"vacantes_disponible\":3,\"matriculados\":17,\"libres\":3},{\"idTallerApertura\":203,\"nombreTaller\":\"ESCULTURA\",\"descripcionTaller\":\"ESCULTURA\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"CE\",\"descripcionEtapa\":\"CE\",\"rangoEdad\":\"6/8 AÑOS\",\"descripcionGrupo\":\"6/8 AÑOS\",\"diaSemana\":\"VIERNES\",\"horaInicio\":\"09:00\",\"horaFin\":\"11:00\",\"fechaInicio\":\"2025-10-03\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"03 DE OCT - 31 DE OCT\",\"profesor\":\"JUAN MARTINEZ\",\"nombreProfesor\":\"JUAN MARTINEZ\",\"total_vacantes\":12,\"vacantes_disponible\":7,\"matriculados\":5,\"libres\":7},{\"idTallerApertura\":204,\"nombreTaller\":\"PIANO Y TECLADO\",\"descripcionTaller\":\"PIANO Y TECLADO\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"HCE\",\"descripcionEtapa\":\"HCE\",\"rangoEdad\":\"9/11 AÑOS\",\"descripcionGrupo\":\"9/11 AÑOS\",\"diaSemana\":\"LUNES\",\"horaInicio\":\"13:30\",\"horaFin\":\"15:30\",\"fechaInicio\":\"2025-10-06\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"06 DE OCT - 31 DE OCT\",\"profesor\":\"ANA RODRIGUEZ\",\"nombreProfesor\":\"ANA RODRIGUEZ\",\"total_vacantes\":18,\"vacantes_disponible\":12,\"matriculados\":6,\"libres\":12},{\"idTallerApertura\":205,\"nombreTaller\":\"PROGRAMACIÓN WEB\",\"descripcionTaller\":\"PROGRAMACIÓN WEB\",\"local\":\"MAGDALENA\",\"nombreLocal\":\"MAGDALENA\",\"nombreAula\":\"AULA 2 - LUZ\",\"etapa\":\"ACE\",\"descripcionEtapa\":\"ACE\",\"rangoEdad\":\"11/16 AÑOS\",\"descripcionGrupo\":\"11/16 AÑOS\",\"diaSemana\":\"MARTES\",\"horaInicio\":\"16:30\",\"horaFin\":\"18:30\",\"fechaInicio\":\"2025-10-07\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"07 DE OCT - 31 DE OCT\",\"profesor\":\"PEDRO SANCHEZ\",\"nombreProfesor\":\"PEDRO SANCHEZ\",\"total_vacantes\":10,\"vacantes_disponible\":1,\"matriculados\":9,\"libres\":1},{\"idTallerApertura\":206,\"nombreTaller\":\"PROGRAMACIÓN AVANZADA\",\"descripcionTaller\":\"PROGRAMACIÓN AVANZADA\",\"local\":\"SAN MIGUEL\",\"nombreLocal\":\"SAN MIGUEL\",\"nombreAula\":\"AULA 3 - LUZ\",\"etapa\":\"ACE\",\"descripcionEtapa\":\"ACE\",\"rangoEdad\":\"11/16 AÑOS\",\"descripcionGrupo\":\"11/16 AÑOS\",\"diaSemana\":\"VIERNES\",\"horaInicio\":\"16:30\",\"horaFin\":\"18:30\",\"fechaInicio\":\"2025-10-03\",\"fechaFin\":\"2025-10-31\",\"rangoFechas\":\"03 DE OCT - 31 DE OCT\",\"profesor\":\"PEDRO SANCHEZ\",\"nombreProfesor\":\"PEDRO SANCHEZ\",\"total_vacantes\":10,\"vacantes_disponible\":1,\"matriculados\":9,\"libres\":1}]"
    ],
    [
      '2025', 'OCTOBER', '[{\"curso\": \"HABLA CON ESTILO\", \"etapa\": \"FORMACIÓN DE LÍDERES\", \"local\": \"SAN MIGUEL\", \"libres\": 0, \"horaFin\": \"14:04\", \"fechaFin\": \"2025-12-11 14:04:00.000000\", \"profesor\": \"\", \"diaSemana\": \"Jueves\", \"rangoEdad\": \"5/10 AÑOS\", \"horaInicio\": \"13:04\", \"nombreAula\": \"AULA VERDE\", \"fechaInicio\": \"2025-10-23 00:00:00.000000\", \"nombreLocal\": \"SAN MIGUEL\", \"rangoFechas\": \"23 OCT - 11 DEC\", \"matriculados\": 0, \"nombreTaller\": \"dsfghjkl\", \"nombreProfesor\": \"\", \"total_vacantes\": 10, \"descripcionCurso\": \"HABLA CON ESTILO\", \"descripcionEtapa\": \"FORMACIÓN DE LÍDERES\", \"descripcionGrupo\": \"5/10 AÑOS\", \"idAperturaTaller\": 1, \"descripcionTaller\": \"dsfghjkl\", \"vacantes_disponible\": 10, \"descripcionCursoCorta\": \"HC\"}]'
    ]
  ];

      console.log('Respuesta del API de calendario de taller:', response);
      // Parsear datos del API y transformarlos a la nueva estructura
      const calendarioMap: { [key: string]: CalendarioMes } = {};
      
      response.data.forEach((element: any) => {
        const anioData = element[0];
        const mesData = element[1];
        const talleresJson = JSON.parse(element[2]);
        
        const key = `${anioData}-${mesData}`;
        
        if (!calendarioMap[key]) {
          calendarioMap[key] = {
            anio: anioData,
            mes: mesData,
            titulo: mesData,
            horarios: []
          };
        }
        
        // Agrupar talleres por horario
        const horarioMap: { [horarioKey: string]: HorarioRow } = {};
        
        talleresJson.forEach((taller: any) => {
          const horarioKey = `${taller.horaInicio}-${taller.horaFin}`;
          
          if (!horarioMap[horarioKey]) {
            horarioMap[horarioKey] = {
              horario: `${this.formatHora(taller.horaInicio)} A ${this.formatHora(taller.horaFin)}`,
              horaInicio: taller.horaInicio,
              horaFin: taller.horaFin,
              aulas: []
            };
          }
          
          // Buscar o crear aula
          let aula = horarioMap[horarioKey].aulas.find(a => a.nombreAula === taller.nombreAula);
          if (!aula) {
            aula = {
              nombreAula: taller.nombreAula || 'Sin Aula',
              talleres: []
            };
            horarioMap[horarioKey].aulas.push(aula);
          }
          
          // Agregar taller al aula
          aula.talleres.push({
            idTallerApertura: taller.idAperturaTaller,
            nombreTaller: taller.nombreTaller || taller.descripcionTaller,
            profesor: taller.profesor || 'Sin Profesor',
            rangoFechas: taller.rangoFechas || `${taller.fechaInicio} - ${taller.fechaFin}`,
            etapa: taller.etapa || taller.descripcionEtapa,
            rangoEdad: taller.rangoEdad || taller.descripcionGrupo,
            diaSemana: taller.diaSemana,
            local: taller.local || taller.nombreLocal,
            curso: taller.nombreCurso || taller.descripcionCurso,
            cursoCorto: taller.descripcionCursoCorta || '',
            nombreLocal: taller.nombreLocal || taller.local,
            matriculados: taller.matriculados || (taller.total_vacantes - taller.vacantes_disponible) || 0,
            disponibles: taller.vacantes_disponible || 0,
            libres: taller.libres || 0,
            totalVacantes: taller.totalVacantes || taller.total_vacantes || 0,
            horaInicio: taller.horaInicio,
            horaFin: taller.horaFin,
            color: taller.color || this.obtenerColorPorHorario(taller.horaInicio)
          });
        });
        
        calendarioMap[key].horarios = Object.values(horarioMap);
      });
      
      this.dataOriginal = Object.values(calendarioMap);
      this.data = JSON.parse(JSON.stringify(this.dataOriginal));
      
      // Inicializar filtros disponibles
      this.extraerFiltrosDisponibles();
      
      console.log('Calendario de Taller transformado:', this.data);
    },
    error: () => {
      Swal.fire('Error', 'Error al cargar el calendario', 'error');
    }
  });
}

formatHora(hora: string): string {
  // Convertir formato 24h a formato 12h con AM/PM
  const [horas, minutos] = hora.split(':');
  const h = parseInt(horas);
  if (h === 0) return '12AM';
  if (h < 12) return `${h}AM`;
  if (h === 12) return '12PM';
  return `${h - 12}PM`;
}

obtenerColorPorHorario(horaInicio: string): string {
  const hora = parseInt(horaInicio.split(':')[0]);
  if (hora >= 9 && hora < 11) return 'bg-warning'; // Naranja
  if (hora >= 11 && hora < 13) return 'bg-info'; // Azul claro
  if (hora >= 13 && hora < 15) return 'bg-danger'; // Magenta/Rosa
  if (hora >= 16 && hora < 19) return 'bg-primary'; // Azul
  return 'bg-secondary';
}

extraerFiltrosDisponibles() {
  // Extraer años y meses únicos
  this.aniosDisponibles = Array.from(new Set(this.dataOriginal.map(m => m.anio.toString())));
  this.mesesDisponibles = Array.from(new Set(this.dataOriginal.map(m => m.mes.toString())));
  
  // Extraer locales, días de semana, etapas, rangos de edad y talleres únicos
  const localesSet = new Set<string>();
  const diasSet = new Set<string>();
  const etapasSet = new Set<string>();
  const cursosSet = new Set<string>();
  const rangoEdadSet = new Set<string>();
  const talleresSet = new Set<string>();
  
  this.dataOriginal.forEach(mes => {
    mes.horarios.forEach(horarioRow => {
      horarioRow.aulas.forEach(aula => {
        aula.talleres.forEach(taller => {
          if (taller.local) localesSet.add(taller.local);
          if (taller.diaSemana) diasSet.add(taller.diaSemana);
          if (taller.etapa) etapasSet.add(taller.etapa);
          if (taller.curso) cursosSet.add(taller.curso)
          if (taller.rangoEdad) rangoEdadSet.add(taller.rangoEdad);
          if (taller.nombreTaller) talleresSet.add(taller.nombreTaller);
        });
      });
    });
  });
  
  this.localesDisponibles = Array.from(localesSet).sort();
  this.diasSemanaDisponibles = Array.from(diasSet).sort();
  this.etapasDisponibles = Array.from(etapasSet).sort();
  this.cursosDisponibles = Array.from(cursosSet).sort();
  this.rangoEdadDisponibles = Array.from(rangoEdadSet).sort();
  this.talleresDisponibles = Array.from(talleresSet).sort();
}

aplicarFiltros() {
  // Crear copia profunda de los datos originales
  this.data = JSON.parse(JSON.stringify(this.dataOriginal));
  
  this.data = this.data.filter(mes => {
    // Filtrar por año y mes
    if (this.filtroAnio && mes.anio !== this.filtroAnio) return false;
    if (this.filtroMes && mes.mes !== this.filtroMes) return false;
    
    // Filtrar horarios dentro de cada mes
    if (this.filtroLocal || this.filtroDiaSemana || this.filtroEtapa || this.filtroRangoEdad || this.filtroTaller || this.filtroCurso) {
      mes.horarios = mes.horarios.map(horarioRow => {
        // Filtrar aulas y talleres dentro de cada horario
        const aulasFiltradas = horarioRow.aulas.map(aula => {
          const talleresFiltrados = aula.talleres.filter(taller => {
            if (this.filtroLocal && taller.local !== this.filtroLocal) return false;
            if (this.filtroDiaSemana && taller.diaSemana !== this.filtroDiaSemana) return false;
            if (this.filtroEtapa && taller.etapa !== this.filtroEtapa) return false;
            if (this.filtroRangoEdad && taller.rangoEdad !== this.filtroRangoEdad) return false;
            if (this.filtroCurso && taller.curso !== this.filtroCurso) return false;
            if (this.filtroTaller && !taller.nombreTaller.toLowerCase().includes(this.filtroTaller.toLowerCase())) return false;
            return true;
          });
          
          return {
            ...aula,
            talleres: talleresFiltrados
          };
        }).filter(aula => aula.talleres.length > 0); // Solo aulas con talleres
        
        return {
          ...horarioRow,
          aulas: aulasFiltradas
        };
      }).filter(horarioRow => horarioRow.aulas.length > 0); // Solo horarios con aulas
      
      // Si después del filtro no quedan horarios, excluir el mes
      return mes.horarios.length > 0;
    }
    
    return true;
  });
}

limpiarFiltros() {
  this.filtroAnio = '';
  this.filtroMes = '';
  this.filtroLocal = '';
  this.filtroDiaSemana = '';
  this.filtroEtapa = '';
  this.filtroRangoEdad = '';
  this.filtroTaller = '';
  this.filtroCurso = '';
  this.data = JSON.parse(JSON.stringify(this.dataOriginal));
}

limpiarAperturaTallerSeleccionado(){
  this.datosTallerSelected = {
    descripcionEtapa: '',
    descripcionCurso: '',
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

// Métodos auxiliares para el calendario
obtenerTodasLasAulas(mes: CalendarioMes): string[] {
  const aulasSet = new Set<string>();
  mes.horarios.forEach(horarioRow => {
    horarioRow.aulas.forEach(aula => {
      aulasSet.add(aula.nombreAula);
    });
  });
  return Array.from(aulasSet).sort();
}

obtenerTalleresDeAula(horarioRow: HorarioRow, nombreAula: string): TallerDetalle[] {
  const aula = horarioRow.aulas.find(a => a.nombreAula === nombreAula);
  return aula ? aula.talleres : [];
}
}
