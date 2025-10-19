import { GrupoTallerService } from './../../../core/services/grupotaller.service';
import { EtapaGrupo } from './../../../core/models/etapagrupo.model';
import { EtapagrupoService } from './../../../core/services/etapagrupo.service';
import { LocalService } from 'src/app/core/services/local.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-aperturataller',
  templateUrl: './aperturataller.component.html',
  styleUrls: ['./aperturataller.component.scss'],
  standalone: false
})
export class AperturatallerComponent implements OnInit, OnDestroy, AfterViewInit  {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  
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


  constructor(
    private localService: LocalService,
    private etapaService: EtapaService,
    private aulaService: AulaService,
    private tallerService: TallerService,
    private grupoService: GrupoService,
    private etapaGrupoService: EtapagrupoService,
    private grupoTallerService : GrupoTallerService,
  ) {}

  

   ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true
    };
    this.configurarDataTables();
    this.cargarDatosIniciales();
    
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
    (document.getElementById('diaSemanaSelect') as HTMLSelectElement).value = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
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
              // Mapea la respuesta usando TallerMapper
              const mapped = TallerMapper.fromResponse(response);
              const dataArray = Array.isArray(mapped.data) ? mapped.data : [mapped.data];
              // Log para depuración
              console.log('Datos recibidos para DataTable:', dataArray);
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
            data: 'id',
            width: '80px'
          },
          {
            title: 'Nombre Taller',
            data: 'descripcion'
          },
          {
            title: 'Local',
            data: 'localDescripcion'
          },
          {
            title: 'Etapa',
            data: 'etapaDescripcion'
          },
          {
            title: 'Grupo',
            data: 'grupoDescripcion'
          },
          {
            title: 'Vacantes Total',
            data: 'vacantesTotal'
          },
          {
            title: 'Vacantes Disponibles',
            data: 'vacantesDisponibles'
          },
          {
            title: 'Dia Semana',
            data: 'diaSemana'
          },
          {
            title: 'Fecha Hora Inicio',
            data: 'fechaHoraInicio'
          },
          {
            title: 'Fecha Hora Fin',
            data: 'fechaHoraFin'
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
                          data-id="${row.id}" 
                          >
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn btn-sm btn-danger btn-delete" 
                          data-id="${row.id}"
                           >
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
          const local: any = {
            id: parseInt(button.dataset['id'] || '0'),
            descripcion: button.dataset['descripcion'] || '',
            direccion: button.dataset['direccion'] || '',
            activo: button.dataset['activo'] === 'true'
          };
          this.editar(local);
        }
        
        if (target.closest('.btn-delete')) {
          const button = target.closest('.btn-delete') as HTMLElement;
          const local: any = {
            id: parseInt(button.dataset['id'] || '0'),
            descripcion: button.dataset['descripcion'] || '',
            direccion: '',
            activo: true
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
    this.seleccionado = { ...item };
    this.modoEdicion = true;
    // Aquí puedes poblar los campos del formulario con los datos seleccionados
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.seleccionado = null;
  }

  view(item:any){

  }
}
