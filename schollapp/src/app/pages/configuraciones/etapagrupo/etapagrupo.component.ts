import { EtapaService } from './../../../core/services/etapa.service';
import { Local } from './../../../core/models/local.model';
import { Component, OnInit } from '@angular/core';

import { EtapaGrupo } from '../../../core/models/etapagrupo.model';
import { EtapagrupoService } from '../../../core/services/etapagrupo.service';
import { LocalService } from 'src/app/core/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etapagrupo',
  templateUrl: './etapagrupo.component.html',
  styleUrls: ['./etapagrupo.component.scss'],
  standalone: false
})
export class EtapagrupoComponent implements OnInit {
  locales: Local[] = [];
  etapas: any[] = [];
  listaGrupos: any[] = [];
  etapasFiltradas: any[] = [];
  selectedLocalId: string = '';
  selectedEtapaId: string = '';

  // Datos para dual-listbox
  availableGroups: Array<any> = [];
  selectedGroups: Array<any> = [];

 

  constructor(
    private etapagrupoService: EtapagrupoService,
    private localService: LocalService,
    private EtapaService: EtapaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    Promise.all([
      this.localService.listarLocales().toPromise(),
      this.EtapaService.listarEtapas().toPromise()
    ]).then(([localesResp, etapasResp]) => {
      this.locales = localesResp && localesResp.data ? (Array.isArray(localesResp.data) ? localesResp.data : [localesResp.data]) : [];
      this.etapas = etapasResp && etapasResp.data ? (Array.isArray(etapasResp.data) ? etapasResp.data : [etapasResp.data]) : [];
    });
  }

  onLocalChange(event: any): void {
    this.selectedLocalId = event.target.value;
    this.etapasFiltradas = this.etapas.filter(etapa => etapa.local.id == this.selectedLocalId);
    this.selectedEtapaId = '';
    this.availableGroups = [];
    this.selectedGroups = [];
    this.listaGrupos = [];
  }

  onEtapaChange(event: any): void {
    this.selectedEtapaId = event.target.value;
    
    if (!this.selectedEtapaId) {
      this.availableGroups = [];
      this.selectedGroups = [];
      return;
    }

    Swal.fire({
      title: 'Cargando grupos...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.etapagrupoService.listar(Number(this.selectedEtapaId)).subscribe({
      next: (resp) => {
        Swal.close();
          this.listaGrupos = Array.isArray(resp.data) ? resp.data : [resp.data];
        this.availableGroups = this.listaGrupos.filter((g: any) => g.asignado === 0);
        this.selectedGroups = this.listaGrupos.filter((g: any) => g.asignado === 1);
      },
      error: (error) => {
        Swal.close();
        Swal.fire('Error', 'Error al cargar los grupos', 'error');
        console.error('Error al cargar grupos:', error);
      }
    });
  }

  onSelectionChange(selectedItems: any[]): void {
    this.selectedGroups = selectedItems;
  }

  guardar(): void {
    if (!this.selectedEtapaId) {
      Swal.fire('Advertencia', 'Debe seleccionar una etapa válida.', 'warning');
      return;
    }

    if (!this.selectedGroups || this.selectedGroups.length === 0) {
      Swal.fire('Advertencia', 'Debe asignar al menos un grupo.', 'warning');
      return;
    }


    

    let payload: any[] = [];

    this.selectedGroups.forEach(g => {
      payload.push({
        idEtapa: Number(this.selectedEtapaId),
        idGrupo: g.idGrupo
      });
    });

     
    Swal.fire({
      title: 'Guardando...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.etapagrupoService.registrar(payload).subscribe({
      next: (resp: any) => {
        Swal.close();
        Swal.fire('Éxito', 'Asignación guardada correctamente.', 'success');
        // Recargar datos
        this.onEtapaChange({ target: { value: this.selectedEtapaId } });
      },
      error: () => {
        Swal.close();
        Swal.fire('Error', 'Error al guardar la asignación.', 'error');
      }
    });
  }
}
