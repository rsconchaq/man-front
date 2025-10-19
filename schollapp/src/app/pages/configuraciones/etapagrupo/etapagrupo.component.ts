import { data } from './../../charts/Apexcharts/area/area.component';
import { EtapaService } from './../../../core/services/etapa.service';
import { Local } from './../../../core/models/local.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { EtapaGrupo } from '../../../core/models/etapagrupo.model';
import { EtapagrupoService } from '../../../core/services/etapagrupo.service';
import { LocalService } from 'src/app/core/services/local.service';
import { DualListComponent } from 'angular-dual-listbox';

@Component({
  selector: 'app-etapagrupo',
  templateUrl: './etapagrupo.component.html',
  styleUrls: ['./etapagrupo.component.scss'],
  standalone: false
})
export class EtapagrupoComponent implements OnInit, AfterViewInit {
  lista: EtapaGrupo[] = [];
  seleccionado: EtapaGrupo | null = null;
  modoEdicion = false;
  locales: Local[] = [];
  etapas: any[] = [];
  etapasFiltradas: any[] = [];

  tab = 1;
  keepSorted = true;
  key: string='';
  display: string='';
  filter = false;
  source: Array<any> = [];
  confirmed: Array<any> = [];
  userAdd = '';
  disabled = false;

  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;

   

  gruposPorAsignar: Array<any> = [];
  gruposAsignados : Array<any> = [];

 

  constructor(private etapagrupoService: EtapagrupoService, private localService:  LocalService,
    private EtapaService : EtapaService
  ) {}


    ngAfterViewInit(): void {
    console.log(this.source);
    console.log(this.confirmed);
    }

  ngOnInit(): void {
    Promise.all([
      this.localService.listarLocales().toPromise(),
      this.EtapaService.listarEtapas().toPromise()
    ]).then(([localesResp, etapasResp]) => {
      this.locales = localesResp && localesResp.data ? (Array.isArray(localesResp.data) ? localesResp.data : [localesResp.data]) : [];
      this.etapas = etapasResp && etapasResp.data ? (Array.isArray(etapasResp.data) ? etapasResp.data : [etapasResp.data]) : [];
       
    });
    
  }


    private useStations() {



    this.key = 'idGrupo';
    this.display = 'descripcionGrupo'; // [ 'station', 'state' ];
    this.keepSorted = true;
    this.source = this.gruposPorAsignar;
    this.confirmed = this.gruposAsignados;
    console.log(this.source);
    console.log(this.confirmed);
  }
  doReset() {
    this.gruposPorAsignar =  this.lista.filter( (element: any) =>  element.asignado == 0);
    this.gruposAsignados = this.lista.filter( (element: any) =>  element.asignado == 1);

    console.log(this.source);
    console.log(this.confirmed);
    this.useStations();
  }



  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

  doDisable() {
    this.disabled = !this.disabled;
  }

  disableBtn() {
    return (this.disabled ? 'Enable' : 'Disabled');
  }

  swapDirection() {
    this.sourceLeft = !this.sourceLeft;
    this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
  }



  onLocalChange(even:any) {


    this.etapasFiltradas = this.etapas.filter(etapa => etapa.local.id == even.target.value );
    console.log("this.etapasFiltradas");
    console.log(this.etapasFiltradas);

  }

  onEtapaChange(event :  any) {
    this.etapagrupoService.listar(event.target.value).subscribe({
      next: (resp) => {
        this.lista = Array.isArray(resp.data) ? resp.data : [resp.data];
        this.gruposAsignados = [];
        this.gruposPorAsignar = [];
        this.doReset();
      }
    });
  }

  guardar() {
    // Validar etapa seleccionada
    const etapaId = this.etapasFiltradas.length > 0 ? this.etapasFiltradas[0].id : null;
    if (!etapaId) {
      alert('Debe seleccionar una etapa válida.');
      return;
    }
    // Validar grupos asignados
    if (!this.confirmed || this.confirmed.length === 0) {
      alert('Debe asignar al menos un grupo.');
      return;
    }
    // Construir payload para guardar asignaciones
    const payload = {
      etapaId: etapaId,
      grupos: this.confirmed.map(g => g.idGrupo)
    };
    // Usar el método registrarAsignacion para el payload personalizado
    this.etapagrupoService.registrar(payload).subscribe({
      next: (resp: any) => {
        alert('Asignación guardada correctamente.');
        // Opcional: recargar datos o limpiar selección
      },
      error: () => {
        alert('Error al guardar la asignación.');
      }
    });
  }

  onDualListChange(destination: any[]) {
    // Actualiza source eliminando los elementos que están en destination
    this.source = this.source.filter(item => !destination.some(d => d.idGrupo === item.idGrupo));
    // Opcional: si quieres que los removidos vuelvan a source, puedes manejarlo aquí
    console.log('Nueva selección de grupos asignados:', destination);
    console.log('Source actualizado:', this.source);
  }
}
