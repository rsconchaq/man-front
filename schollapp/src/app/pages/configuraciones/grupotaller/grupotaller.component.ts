import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { GrupoTallerService } from '../../../core/services/grupotaller.service';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../../../global-component';
import { LocalService } from '../../../core/services/local.service';
import { EtapaService } from '../../../core/services/etapa.service';

@Component({
  selector: 'app-grupotaller',
  templateUrl: './grupotaller.component.html',
  styleUrls: ['./grupotaller.component.scss'],
  standalone: false,
 })
export class GrupotallerComponent implements OnInit {
  loadingGuardar = false;
  ngOnInit(): void {
    // Invocar servicio de locales
    this.localService.listarLocales().subscribe({
      next: (resp) => { this.locales = Array.isArray(resp.data) ? resp.data : [resp.data]; }
    });
    this.etapas = [];
    this.gruposEdad = [];
  }

  onLocalChange() {
    // Invocar servicio de etapas y filtrar por local seleccionado
    this.etapaService.listarEtapas().subscribe({
      next: (resp) => {
        const todasEtapas = Array.isArray(resp.data) ? resp.data : [resp.data];
        // Filtrar etapas por localSeleccionado si la propiedad existe
        this.etapas = todasEtapas.filter(e => e.localId == this.localSeleccionado);
      }
    });
    this.etapaSeleccionada = null;
    this.grupoEdadSeleccionado = null;
    this.gruposEdad = [];
  }

  onEtapaChange(){

  }
 
  locales: any[] = [];
  localSeleccionado: any;
  etapas: any[] = [];
  etapaSeleccionada: any;
  gruposEdad: any[] = [];
  grupoEdadSeleccionado: any;
  // Métodos para dual-listbox
  onAsignadosChange(event: any) {
    this.talleresAsignados = event;
  }
  onPorAsignarChange(event: any) {
    this.talleresPorAsignar = event;
  }
  local = '';
  etapa = '';
  grupoEdad = '';
  filtroAsignados = '';
  filtroPorAsignar = '';
  talleresAsignados: any[] = [];
  talleresPorAsignar: any[] = [];
  seleccionAsignados: any[] = [];
  seleccionPorAsignar: any[] = [];

  constructor(
    private grupoTallerService: GrupoTallerService,
    private localService: LocalService,
    private etapaService: EtapaService,
    private http: HttpClient
  ) {}

  buscar() {
    // Llama al API para obtener los talleres asignados y por asignar
    if (this.localSeleccionado && this.etapaSeleccionada && this.grupoEdadSeleccionado) {
      this.http.get<any>(GlobalComponent.API_URL + 'v1/grupotaller/listar/' + this.localSeleccionado + '/' + this.grupoEdadSeleccionado, { headers: GlobalComponent.headerToken })
        .subscribe({
          next: (resp) => {
            this.talleresAsignados = resp.data?.talleresAsignados || [];
            this.talleresPorAsignar = resp.data?.talleresPorAsignar || [];
          }
        });
    }
  }

  guardarCambios() {
    // Validar selección de combos
    if (!this.localSeleccionado || !this.etapaSeleccionada || !this.grupoEdadSeleccionado) {
      alert('Debe seleccionar Local, Etapa y Grupo Edad antes de guardar.');
      return;
    }
    this.loadingGuardar = true;
    const data = {
      localId: this.localSeleccionado,
      etapaId: this.etapaSeleccionada,
      grupoEdadId: this.grupoEdadSeleccionado,
      talleresAsignados: this.talleresAsignados.map(t => t.id)
    };
    this.grupoTallerService.asignarTalleres(data).subscribe({
      next: (response) => {
        this.loadingGuardar = false;
        if (response.success) {
          alert('Asignación guardada correctamente');
        } else {
          alert('Error al guardar la asignación');
        }
      },
      error: () => {
        this.loadingGuardar = false;
        alert('Error de red al guardar la asignación');
      }
    });
  }

  desasignarTaller() {
    // Quita los seleccionados de talleresAsignados y los pasa a talleresPorAsignar
    this.seleccionAsignados.forEach(taller => {
      this.talleresAsignados = this.talleresAsignados.filter(t => t.id !== taller.id);
      this.talleresPorAsignar.push(taller);
    });
    this.seleccionAsignados = [];
  }

  asignarTaller() {
    // Quita los seleccionados de talleresPorAsignar y los pasa a talleresAsignados
    this.seleccionPorAsignar.forEach(taller => {
      this.talleresPorAsignar = this.talleresPorAsignar.filter(t => t.id !== taller.id);
      this.talleresAsignados.push(taller);
    });
    this.seleccionPorAsignar = [];
  }

  seleccionarTodosAsignados() {
    this.seleccionAsignados = [...this.talleresAsignados];
  }

  deseleccionarTodosAsignados() {
    this.seleccionAsignados = [];
  }

  seleccionarTodosPorAsignar() {
    this.seleccionPorAsignar = [...this.talleresPorAsignar];
  }

  deseleccionarTodosPorAsignar() {
    this.seleccionPorAsignar = [];
  }
}
