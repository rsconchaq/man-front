import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GrupoTallerService } from '../../../core/services/grupotaller.service';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../../../global-component';
import { LocalService } from '../../../core/services/local.service';
import { EtapaService } from '../../../core/services/etapa.service';
import { GrupoService } from '../../../core/services/grupo.service';
import Swal from 'sweetalert2';
import { EtapagrupoService } from 'src/app/core/services/etapagrupo.service';

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
    this.listaTalleres = [];
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
    this.listaTalleres = [];
  }

  onEtapaChange( ) {
    // Cargar grupos de edad cuando se selecciona una etapa
    if (this.etapaSeleccionada) {
      Swal.fire({
        title: 'Cargando grupos...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.etapagrupoService.listar(this.etapaSeleccionada).subscribe({
        next: (resp) => {
          Swal.close();
          this.gruposEdad = Array.isArray(resp.data) ? resp.data.filter((g: any) => g.asignado == 1) : [resp.data.filter((g: any) => g.asignado == 1)];
        },
        error: (error) => {
          Swal.close();
          Swal.fire('Error', 'No se pudieron cargar los grupos de edad', 'error');
        }
      });
    }
    this.grupoEdadSeleccionado = null;
    // Limpiar dual-listbox
    this.talleresAsignados = [];
    this.talleresPorAsignar = [];
  }
 
  locales: any[] = [];
  localSeleccionado: any = "";
  etapas: any[] = [];
  etapaSeleccionada: any = "";
  gruposEdad: any[] = [];
  grupoEdadSeleccionado: any = "";
  // Datos para dual-listbox
  talleresAsignados: any[] = [];
  talleresPorAsignar: any[] = [];
  listaTalleres: any [] = [];

  // Método para manejar cambios en el dual-listbox
  onSelectionChange(selectedItems: any[]) {
    this.talleresAsignados = selectedItems;
  }

  constructor(
    private grupoTallerService: GrupoTallerService,
    private localService: LocalService,
    private etapaService: EtapaService,
    private grupoService: GrupoService,
    private etapagrupoService: EtapagrupoService,
  ) {}

  buscar() {
    // Validar que se hayan seleccionado todos los filtros
    if (!this.localSeleccionado || !this.etapaSeleccionada || !this.grupoEdadSeleccionado) {
      Swal.fire('Advertencia', 'Debe seleccionar Local, Etapa y Grupo de Edad', 'warning');
      return;
    }

    Swal.fire({
      title: 'Buscando talleres...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Llama al API para obtener los talleres asignados y por asignar
    this.grupoTallerService.listar(this.etapaSeleccionada, this.grupoEdadSeleccionado)
      .subscribe({
        next: (resp) => {
          Swal.close();
          this.listaTalleres = resp.data || [];
          this.talleresAsignados = this.listaTalleres.filter((t: any) => t.asignado == 1) || [];
          this.talleresPorAsignar = this.listaTalleres.filter((t: any) => t.asignado == 0) || [];

          if (this.talleresAsignados.length === 0 && this.talleresPorAsignar.length === 0) {
            Swal.fire('Información', 'No se encontraron talleres para asignar', 'info');
          }
        },
        error: (error) => {
          Swal.close();
          Swal.fire('Error', 'No se pudieron cargar los talleres', 'error');
        }
      });
  }

  guardarCambios() {
    // Validar selección de combos
    if (!this.localSeleccionado || !this.etapaSeleccionada || !this.grupoEdadSeleccionado) {
      Swal.fire('Advertencia', 'Debe seleccionar Local, Etapa y Grupo Edad antes de guardar.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Guardando cambios...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.loadingGuardar = true;
    let payload: any[] = [];
    

    this.talleresAsignados.forEach((t: any) => {
      payload.push({
        idEtapa: this.etapaSeleccionada,
        idGrupo: this.grupoEdadSeleccionado,
        idTaller: t.idTaller,
      });
    });

     

    this.grupoTallerService.asignarTalleres(payload).subscribe({
      next: (response) => {
        this.loadingGuardar = false;
        Swal.close();
        if (response.success) {
          Swal.fire('Éxito', 'Asignación guardada correctamente', 'success');
        } else {
          Swal.fire('Error', response.message || 'Error al guardar la asignación', 'error');
        }
      },
      error: (error) => {
        this.loadingGuardar = false;
        Swal.close();
        Swal.fire('Error', 'Error de red al guardar la asignación', 'error');
      }
    });
  }
}
