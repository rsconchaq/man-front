
import { GrupoTallerService } from './../../../core/services/grupotaller.service';
import { EtapaGrupo } from './../../../core/models/etapagrupo.model';
import { EtapagrupoService } from './../../../core/services/etapagrupo.service';
import { LocalService } from 'src/app/core/services/local.service';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { EtapaService } from 'src/app/core/services/etapa.service';
import { AulaService } from 'src/app/core/services/aula.service';
import { TallerService } from 'src/app/core/services/taller.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { TallerMapper } from 'src/app/core/models/taller.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aperturataller',
  templateUrl: './aperturataller.component.html',
  styleUrls: ['./aperturataller.component.scss'],
  standalone: false
})
export class AperturatallerComponent implements OnInit, OnDestroy, AfterViewInit  {
  aperturaTallerForm!: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private modalRef: any;

  @ViewChild('DetalleFechasModal', { static: true })
  detalleFechasModalTemplate!: TemplateRef<any>;
  
  lista: any[] = [];
  seleccionado: any = null;
  modoEdicion = false;

  listaLocal : any[]=[];
  listaEtapa : any[]=[];
  listaEtapaFiltrar : any[]=[];
  listaGrupo : any[]=[];
  listaAula : any[]=[];
  listaAulaFiltrada : any[]=[];
  listaTaller : any[]=[];
  listaCronograma : any[]=[];
  listaDetalleFechas : any[]=[];


  constructor(
    private localService: LocalService,
    private etapaService: EtapaService,
    private aulaService: AulaService,
    private tallerService: TallerService,
    private grupoService: GrupoService,
    private etapaGrupoService: EtapagrupoService,
    private grupoTallerService : GrupoTallerService,
    private fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  

   ngOnInit() {
    this.aperturaTallerForm = this.fb.group({
      localId: ['', Validators.required],
      etapaId: ['', Validators.required],
      grupoId: ['', Validators.required],
      aulaId: ['', Validators.required],
      tallerId: ['', Validators.required],
      vacantes: ['', [Validators.required, Validators.min(1)]],
      aperturaClase0: [false],
      fechaInicio: ['', Validators.required],
      diaSemana: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      descripcionTaller: ['', Validators.required]
    });
  this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true
    };
    this.configurarDataTables();
    this.cargarDatosIniciales();

    // Cargar talleres aperturados para la grilla Angular
    this.tallerService.listarAperturaTaller().subscribe({
      next: (response) => {
        const mapped = TallerMapper.fromResponse(response);
        this.lista = Array.isArray(mapped.data) ? mapped.data : [mapped.data];
      },
      error: (error) => {
        console.error('Error al cargar talleres aperturados:', error);
        this.lista = [];
      }
    });
  }

   ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cargarDatosIniciales(): void {
    forkJoin({
      localesResp: this.localService.listarLocales(),
      etapasResp: this.etapaService.listarEtapas(),
      aulasResp: this.aulaService.listarAulas(),
    }).subscribe({
      next: ({ localesResp, etapasResp, aulasResp }) => {

        this.listaLocal = Array.isArray(localesResp?.data) ? localesResp.data : [localesResp.data];
        this.listaEtapa = Array.isArray(etapasResp?.data) ? etapasResp.data : [etapasResp.data];
        this.listaAula = Array.isArray(aulasResp?.data) ? aulasResp.data : [aulasResp.data];
        console.log('Locales:', this.listaLocal);
        console.log('Etapas:', this.listaEtapa);
        console.log('Grupos:', this.listaGrupo);
        console.log('Aulas:', this.listaAula);
        console.log('Talleres:', this.listaTaller);
        // console.log('Cronogramas:', this.listaCronograma);
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }

  onLocalChange(event: any) {
    const selectedLocalId = event.target.value;
    this.listaEtapaFiltrar = [];
    this.listaEtapaFiltrar = this.listaEtapa.filter(etapa => etapa.local.id == selectedLocalId);

    this.listaAulaFiltrada = [];
    this.listaAulaFiltrada = this.listaAula.filter(aula => aula.idLocal == selectedLocalId)

    this.listaGrupo = [];
  }

  onEtapaChange(event: any){
    const selectedEtapaId = event.target.value;
     Swal.fire({
       title: 'Cargando grupos...',
       didOpen: () => {
            Swal.showLoading()
       } }); 

    this.etapaGrupoService.listar(selectedEtapaId).subscribe({
      next: (response) => {
            Swal.close();
            this.listaGrupo = Array.isArray(response?.data) ? response.data : [response.data];

       },
        error: (error) => {
             Swal.close();
            console.error('Error al cargar datos de EtapaGrupo:', error);
        }
    });
  }

  onGrupoChange(event: any) {
    const selectedGrupoId = event.target.value;
    //const selectedEtapaId = // obtener lo seleccionado en el html del select etapa
    const selectedEtapaId = (document.getElementById('etapaSelect') as HTMLSelectElement).value; 


    Swal.fire({
        title: 'Cargando talleres...',
        didOpen: () => {
            Swal.showLoading()
        }  });


    this.grupoTallerService.listar(selectedEtapaId,selectedGrupoId).subscribe({
        next: (resp) => {
            Swal.close();

            this.listaTaller = Array.isArray(resp.data) ? resp.data : [resp.data];
            this.listaTaller = this.listaTaller.filter( taller => taller.asignado==1);
            console.log('Lista de Talleres:', this.lista);
        },
        error: (error) => {
             Swal.close();
            console.error('Error al cargar datos de GrupoTaller:', error);
        }
    });

  }

  onDiaSemanaChange(event: any) {
    const selectedDiaSemana = event.target.value;
    const diasSemana = [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
    const fecha = new Date(selectedDiaSemana);
    const diaSemana = diasSemana[fecha.getDay()]; // domingo=0, lunes=1, etc.
    this.aperturaTallerForm.controls['diaSemana'].setValue(diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1));
  }


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
        this.tallerService.listarAperturaTaller().subscribe({
          next: (response) => {
             const dataArray = response.data;
            callback({
              recordsTotal: dataArray.length,
              recordsFiltered: dataArray.length,
              data: dataArray
            });
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
          title: 'IdApertura',
          data: 'idAperturaTaller',
          width: '80px'
        },
        {
          title: 'Nombre Taller',
          data: 'descripcionTaller'
        },
        {
          title: 'Local',
          data: 'descripcionLocal'
        },
        {
          title: 'Etapa',
          data: 'descripcionEtapa'
        },
        {
          title: 'Grupo',
          data: 'descripcionGrupo'
        },
        {
          title: 'Vacantes Total',
          data: 'total_vacantes'
        },
        {
          title: 'Vacantes Disponibles',
          data: 'vacantes_disponible'
        },
        {
          title: 'Dia Semana',
          data: 'diaSemana'
        },
        {
          title: 'Fecha Hora Inicio',
          data: 'fechaInicio'
        },
        {
          title: 'Fecha Hora Fin',
          data: 'fechaFin'
        },
        {
          title: 'Estado',
          data: 'estado',
          render: (estado: number) => {
            return estado === 1 ? '<span class="badge bg-success">ACTIVO</span>' : '<span class="badge bg-danger">INACTIVO</span>';
          }
        },
        {
          title: 'Acciones',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary btn-edit"
                        data-id="${row.idAperturaTaller}"
                         title="Editar">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete"
                        data-id="${row.idAperturaTaller}"
                        title="Detalle Fechas">
                  <i class=" ri-eye-line"></i>
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
          const local: any = {
              id: parseInt(button.dataset['id'] || '0') 
          };
          this.editar(local);
        }
        
        if (target.closest('.btn-delete')) {
          const button = target.closest('.btn-delete') as HTMLElement;
          const local: any = {
            id: parseInt(button.dataset['id'] || '0')  
          };
          this.view(local);
        }
      });
  }

 private cargarTaller(): void {
    this.localService.listarLocales().subscribe({
      next: (response) => {
        if (response.success) {
          //this.locales = response.data  || [];
          console.log(response.data);
          this.recargarDataTable();
        }
      },
      error: (error) => {
        console.error('Error al cargar locales:', error);
      }
    });
  }


  aperturarTaller() {
    if (!this.aperturaTallerForm || this.aperturaTallerForm.invalid) {
      this.aperturaTallerForm?.markAllAsTouched();
      return;
    }
    const form = this.aperturaTallerForm.value;
    // Suponiendo 8 semanas, puedes ajustar según tu lógica
    const cantidadSemanas = 8;
    const fechas = this.generarFechas(form.fechaInicio, form.horaInicio, form.horaFin, cantidadSemanas);
    const body = {
      idAperturaTaller: 0,
      idEtapaDetalleTaller: 0,
      idEtapa: form.etapaId,
      idGrupo: form.grupoId,
      idTaller: form.tallerId,
      idAula: form.aulaId,
      descripcionTaller: form.descripcionTaller,
      diaSemana: form.diaSemana,
      horaInicio: form.horaInicio,
      horaFin: form.horaFin,
      fechaInicio: form.fechaInicio,
      fechaFin: fechas.length > 0 ? fechas[fechas.length-1].fechaFin : '',
      total_vacantes: form.vacantes,
      vacantes_disponible: form.vacantes,
      apertura: form.aperturaClase0 ? 1 : 0,
      fechas: fechas
    };
    this.tallerService.aperturarTaller(body).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire('Éxito', 'Taller aperturado correctamente', 'success');
          this.aperturaTallerForm.reset();
          this.recargarDataTable();
        }
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo aperturar el taller', 'error');
      }
    });
  }

  // Genera un array de fechas semanales a partir de la fecha de inicio y cantidad de semanas
  generarFechas(fechaInicio: string, horaInicio: string, horaFin: string, cantidadSemanas: number): {fechaInicio: string, fechaFin: string}[] {
    const fechas = [];
    let fecha = new Date(fechaInicio + 'T' + horaInicio);
    for (let i = 0; i < cantidadSemanas; i++) {
      const inicio = new Date(fecha);
      const fin = new Date(fecha);
      const [hFin, mFin] = horaFin.split(':');
      fin.setHours(Number(hFin), Number(mFin));
      fechas.push({
        fechaInicio: `${inicio.getFullYear()}-${(inicio.getMonth()+1).toString().padStart(2,'0')}-${inicio.getDate().toString().padStart(2,'0')} ${horaInicio}`,
        fechaFin: `${fin.getFullYear()}-${(fin.getMonth()+1).toString().padStart(2,'0')}-${fin.getDate().toString().padStart(2,'0')} ${horaFin}`
      });
      fecha.setDate(fecha.getDate() + 7);
    }
    return fechas;
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

  editar(item: any) {
 
    this.tallerService.obtenerAperturaTallerId(item.id).subscribe({
      next: (resp) => {
        const data = resp.data;
        

        const etapa = this.listaEtapa.filter(et => et.id == data.idEtapa)[0];
        this.listaEtapaFiltrar = this.listaEtapa.filter(et => et.local.id == etapa.localId);
        this.listaAulaFiltrada = this.listaAula.filter(aula => aula.idLocal == etapa.localId)



    this.aperturaTallerForm.patchValue({
      localId: etapa.localId || '',
      etapaId: data.idEtapa || '',
      grupoId: data.idGrupo || '',
      aulaId: data.idAula || '',
      tallerId: data.idTaller || '',
      vacantes: data.total_vacantes || '',
      aperturaClase0: data.apertura || false,
      fechaInicio: data.fechaInicio ? data.fechaInicio.split(' ')[0] : '',
      diaSemana: data.diaSemana || '',
      horaInicio: data.horaInicio || '',
      horaFin: data.horaFin || '',
      descripcionTaller: data.descripcionTaller || ''
    });
      },
      error: (error) => {
        console.error('Error al obtener detalle de apertura de taller:', error);
      }
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.seleccionado = null;
  }

  view(item:any){
    Swal.fire({
      title: 'Detalle de Fechas',
      text: 'Cargando...',
      showConfirmButton: false
    });
    this.tallerService.obtenerAperturaTallerId(item.id).subscribe({
      next: (resp) => {
        Swal.close();
        const data = resp.data;
        this.listaDetalleFechas = data.fechas;
        this.modalRef = this.modalService.open(this.detalleFechasModalTemplate, {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        });
      },
      error: (error) => {
        Swal.close();
        console.error('Error al obtener detalle de apertura de taller:', error);
      }
    });
  }

    cerrarModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.listaDetalleFechas = [];
    }
  }
}
