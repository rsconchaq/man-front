import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';

import { PermisoRol } from '../../../core/models/permiso-rol.model';
import { Rol } from '../../../core/models/rol.model';
import { PermisoRolService } from '../../../core/services/permiso-rol.service';
import { RolService } from '../../../core/services/rol.service';

declare const $: any;

@Component({
  selector: 'app-permisorol',
  templateUrl: './permisorol.component.html',
  styleUrls: ['./permisorol.component.scss'],
  standalone: false
})
export class PermisoRolComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  // DataTables configuration
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Data properties
  roles: Rol[] = [];
  permisos: PermisoRol[] = [];
  permisosModificados: PermisoRol[] = [];
  
  // UI State
  loading = false;
  mostrarTabla = false;
  rolSeleccionado: number | null = null;
  rolSeleccionadoNombre = 'SELECCIONE';
  dataTableInicializada = false;
  componenteDestruyendose = false;

  constructor(
    private readonly permisoRolService: PermisoRolService,
    private readonly rolService: RolService
  ) { }

  ngOnInit(): void {
    this.configurarDataTables();
    this.cargarRoles();
    this.configurarEventListeners();
  }

  ngAfterViewInit(): void {
    // DataTables se inicializa cuando se buscan permisos por primera vez
    console.log('Component initialized - DataTables esperando búsqueda');
  }

  ngOnDestroy(): void {
    // Marcar que el componente se está destruyendo
    this.componenteDestruyendose = true;
    this.dataTableInicializada = false;
    
    // Desuscribir el Subject si existe y no está cerrado
    if (this.dtTrigger && !this.dtTrigger.closed) {
      this.dtTrigger.unsubscribe();
    }
    
    // Remover event listeners
    $(document).off('click', '.permiso-checkbox');
  }

  /**
   * Configurar DataTables
   */
  private configurarDataTables(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      processing: true,
      searching: true,
      ordering: true,
      info: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando 0 a 0 de 0 registros',
        infoFiltered: '(filtrado de _MAX_ registros totales)',
        loadingRecords: 'Cargando...',
        zeroRecords: 'No se encontraron registros coincidentes',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        }
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        console.log('=== DATATABLES AJAX CALL ===');
        console.log('Rol seleccionado:', this.rolSeleccionado);
        
        if (!this.rolSeleccionado) {
          console.log('No hay rol seleccionado, retornando vacío');
          this.loading = false;
          callback({ recordsTotal: 0, recordsFiltered: 0, data: [] });
          return;
        }

        // Invocar al servicio para obtener los datos
        console.log('Invocando servicio desde Ajax...');
        this.permisoRolService.listarPermisos(this.rolSeleccionado).subscribe({
          next: (response) => {
            console.log('Servicio respondió:', response);
            
            if (response.success && Array.isArray(response.data)) {
              this.permisos = response.data;
              console.log('✅ Datos cargados del servicio:', this.permisos.length);
              this.loading = false; // Desactivar loading aquí
              callback({
                recordsTotal: response.data.length,
                recordsFiltered: response.data.length,
                data: response.data
              });
            } else {
              console.warn('Respuesta inválida, usando datos de prueba');
              const datosPrueba = this.obtenerDatosPrueba(this.rolSeleccionado!);
              this.permisos = datosPrueba;
              this.loading = false; // Desactivar loading aquí
              callback({
                recordsTotal: datosPrueba.length,
                recordsFiltered: datosPrueba.length,
                data: datosPrueba
              });
            }
          },
          error: (error) => {
            console.error('Error en servicio, usando datos de prueba:', error);
            const datosPrueba = this.obtenerDatosPrueba(this.rolSeleccionado!);
            this.permisos = datosPrueba;
            this.loading = false; // Desactivar loading aquí
            callback({
              recordsTotal: datosPrueba.length,
              recordsFiltered: datosPrueba.length,
              data: datosPrueba
            });
          }
        });
      },
      columns: [
        {
          title: '#',
          data: null,
          orderable: false,
          searchable: false,
          width: '50px',
          render: (data: any, type: any, row: any, meta: any) => {
            return meta.row + 1;
          }
        },
        {
          title: 'Activar',
          data: 'activar',
          orderable: false,
          searchable: false,
          width: '80px',
          className: 'text-center',
          render: (data: boolean, type: any, row: PermisoRol) => {
            const checked = data ? 'checked' : '';
            return `
              <div class="form-check form-switch">
                <input class="form-check-input permiso-checkbox" 
                       type="checkbox" 
                       ${checked}
                       data-id-permiso="${row.idPermisos}"
                       data-id-rol="${row.idRol}">
              </div>
            `;
          }
        },
        {
          title: 'Menu',
          data: 'menu',
          orderable: true,
          searchable: true
        },
        {
          title: 'Sub Menu',
          data: 'subMenu',
          orderable: true,
          searchable: true
        }
      ]
    };
  }

  /**
   * Configurar event listeners
   */
  private configurarEventListeners(): void {
    // Event delegation para checkboxes dinámicos
    $(document).on('change', '.permiso-checkbox', (event: any) => {
      const checkbox = $(event.target);
      const idPermisos = parseInt(checkbox.data('id-permiso'));
      const idRol = parseInt(checkbox.data('id-rol'));
      const activo = checkbox.is(':checked');

      console.log('Checkbox changed:', { idPermisos, idRol, activo });

      // Actualizar el array de permisos
      const permisoIndex = this.permisos.findIndex(p => p.idPermisos === idPermisos);
      if (permisoIndex !== -1) {
        this.permisos[permisoIndex].activar = activo;
        
        // Agregar/actualizar en permisos modificados
        const modificadoIndex = this.permisosModificados.findIndex(p => p.idPermisos === idPermisos);
        if (modificadoIndex !== -1) {
          this.permisosModificados[modificadoIndex].Activo = activo ? 1 : 0;
        } else {
          this.permisosModificados.push({
            ...this.permisos[permisoIndex],
            Activo: activo ? 1 : 0
          });
        }
      }

      console.log('Permisos modificados:', this.permisosModificados);
    });
  }

  /**
   * Cargar lista de roles
   */
  cargarRoles(): void {
    this.loading = true;
    this.rolService.listarRoles().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.roles = response.data;
        } else {
          this.mostrarError('Error al cargar roles: ' + response.message);
          this.roles = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
        this.mostrarError('Error al cargar roles. Intente nuevamente.');
        this.roles = [];
        this.loading = false;
      }
    });
  }


  /**
   * Manejar cambio de rol
   */
  onRolChange(): void {
    console.log('=== CAMBIO DE ROL ===');
    console.log('Nuevo rol seleccionado:', this.rolSeleccionado);
    
    // Verificar que el componente no se esté destruyendo
    if (this.componenteDestruyendose) {
      console.log('Componente se está destruyendo, abortando cambio de rol');
      return;
    }
    
    // Resetear estado inmediatamente
    this.mostrarTabla = false;
    this.permisos = [];
    this.permisosModificados = [];
    this.loading = false;
    
    // Actualizar nombre del rol seleccionado
    if (this.rolSeleccionado) {
      const rol = this.roles.find(r => r.IdRol === this.rolSeleccionado);
      this.rolSeleccionadoNombre = rol ? rol.Descripcion : '';
      console.log('Rol seleccionado:', this.rolSeleccionadoNombre);
    } else {
      this.rolSeleccionadoNombre = '';
      return; // Si no hay rol, salir
    }
    
    // Manejar DataTable existente
    if (this.dtElement && this.dataTableInicializada) {
      console.log('Destruyendo DataTable existente para cambio de rol...');
      this.dtElement.dtInstance?.then((dtInstance: any) => {
        try {
          dtInstance.destroy();
          console.log('DataTable destruida exitosamente');
        } catch (error) {
          console.warn('Error al destruir DataTable:', error);
        }
        
        // Resetear estado después de destruir
        this.dataTableInicializada = false;
        this.mostrarTabla = false;
        
        // Cargar permisos para el nuevo rol después de un pequeño delay
        this.cargarPermisosAutomaticamente();
        
      }).catch((error: any) => {
        console.warn('Error en proceso de destrucción:', error);
        this.dataTableInicializada = false;
        this.cargarPermisosAutomaticamente();
      });
    } else {
      // No hay DataTable existente, cargar directamente
      console.log('No hay DataTable existente, cargando permisos directamente...');
      this.dataTableInicializada = false;
      this.cargarPermisosAutomaticamente();
    }
  }

  /**
   * Cargar permisos automáticamente cuando cambia el rol
   */
  private cargarPermisosAutomaticamente(): void {
    if (!this.rolSeleccionado || this.componenteDestruyendose) {
      console.warn('No hay rol seleccionado o componente destruyéndose para carga automática');
      return;
    }

    console.log('=== CARGA AUTOMÁTICA DE PERMISOS ===');
    console.log('Cargando automáticamente para rol:', this.rolSeleccionado, '(' + this.rolSeleccionadoNombre + ')');
    console.log('Estado actual - DataTable inicializada:', this.dataTableInicializada);
    console.log('Estado actual - Mostrar tabla:', this.mostrarTabla);
    
    // Pequeño delay para asegurar que el DOM esté listo y el estado limpio
    setTimeout(() => {
      if (!this.componenteDestruyendose) {
        console.log('Ejecutando buscarPermisos() automáticamente...');
        this.buscarPermisos();
      } else {
        console.log('Componente destruyéndose, cancelando carga automática');
      }
    }, 200);
  }

  /**
   * Abrir selector de rol modal
   */
  abrirSelectorRol(): void {
    // Crear opciones para el selector
    const opcionesRoles = this.roles.reduce((opciones: any, rol) => {
      opciones[rol.IdRol!] = rol.Descripcion;
      return opciones;
    }, {});

    Swal.fire({
      title: 'Seleccionar Rol',
      text: 'Los permisos se cargarán automáticamente',
      input: 'select',
      inputOptions: opcionesRoles,
      inputPlaceholder: 'Seleccione un rol...',
      showCancelButton: true,
      confirmButtonText: 'Seleccionar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe seleccionar un rol';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.rolSeleccionado = parseInt(result.value);
        this.onRolChange(); // Esto ahora cargará automáticamente los permisos
      }
    });
  }

  /**
   * Buscar permisos del rol seleccionado
   */
  buscarPermisos(): void {
    if (!this.rolSeleccionado) {
      this.mostrarError('Seleccione un rol primero');
      return;
    }

    if (this.componenteDestruyendose) {
      console.log('Componente se está destruyendo, abortando búsqueda');
      return;
    }

    console.log('=== INICIANDO BÚSQUEDA ===');
    console.log('Rol seleccionado:', this.rolSeleccionado);
    console.log('DataTable ya inicializada:', this.dataTableInicializada);
    console.log('Mostrar tabla actual:', this.mostrarTabla);

    this.loading = true;
    this.permisosModificados = [];
    this.permisos = []; // Limpiar datos anteriores

    // Verificar si DataTable realmente existe y está inicializada
    const dataTableExists = this.dataTableInicializada && this.dtElement && this.mostrarTabla;
    
    if (dataTableExists) {
      console.log('Recargando DataTable existente...');
      this.dtElement.dtInstance?.then((dtInstance: any) => {
        if (dtInstance) {
          dtInstance.ajax.reload((json: any) => {
            console.log('DataTable recargada exitosamente:', json);
            this.loading = false;
          }, false);
        } else {
          console.warn('DataTable instance no válida, reinicializando...');
          this.reinicializarDataTable();
        }
      }).catch((error: any) => {
        console.error('Error recargando DataTable, reinicializando:', error);
        this.reinicializarDataTable();
      });
    } else {
      console.log('Inicializando DataTable desde cero...');
      this.reinicializarDataTable();
    }
  }

  /**
   * Reinicializar DataTable completamente
   */
  private reinicializarDataTable(): void {
    console.log('Reinicializando DataTable...');
    
    // Verificar que el componente no se esté destruyendo
    if (this.componenteDestruyendose) {
      console.log('Componente se está destruyendo, abortando reinicialización');
      return;
    }
    
    // Verificar que el Subject esté disponible
    if (!this.dtTrigger || this.dtTrigger.closed) {
      console.log('Subject no disponible, recreando...');
      this.dtTrigger = new Subject<any>();
    }
    
    // Resetear estado
    this.dataTableInicializada = false;
    this.mostrarTabla = true;
    
    setTimeout(() => {
      // Verificar nuevamente antes de ejecutar
      if (this.componenteDestruyendose || !this.dtTrigger || this.dtTrigger.closed) {
        console.log('Componente destruyéndose o Subject cerrado durante timeout, abortando...');
        return;
      }
      
      console.log('Ejecutando dtTrigger.next()...');
      this.dtTrigger.next(null);
      this.dataTableInicializada = true;
      console.log('DataTable reinicializada correctamente');
      
      // Timeout de seguridad para desactivar loading
      setTimeout(() => {
        if (this.loading && !this.componenteDestruyendose) {
          console.warn('Forzando desactivación de loading por timeout');
          this.loading = false;
        }
      }, 3000);
    }, 100);
  }

  /**
   * Guardar cambios realizados
   */
  guardarCambios(): void {
    if (!this.rolSeleccionado) {
      this.mostrarError('Seleccione un rol primero');
      return;
    }

    if (this.permisosModificados.length === 0) {
      this.mostrarAdvertencia('No hay cambios para guardar');
      return;
    }

    Swal.fire({
      title: '¿Confirmar cambios?',
      text: `Se guardarán los cambios realizados en ${this.permisosModificados.length} permisos`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ejecutarGuardado();
      }
    });
  }

  /**
   * Ejecutar guardado de permisos
   */
  private ejecutarGuardado(): void {
    this.loading = true;

    this.permisoRolService.guardarPermisos(this.permisosModificados).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.mostrarExito('Permisos guardados exitosamente');
          this.permisosModificados = [];
          this.reloadDataTable();
        } else {
          this.mostrarError('Error al guardar permisos: ' + response.message);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al guardar permisos:', error);
        this.mostrarError('Error al guardar permisos. Intente nuevamente.');
      }
    });
  }

  /**
   * Recargar DataTable para actualizar la grilla
   */
  private reloadDataTable(): void {
    console.log('Actualizando grilla después de cambios...');
    
    if (this.dtElement && this.dataTableInicializada) {
      this.dtElement.dtInstance?.then((dtInstance: any) => {
        console.log('Ejecutando actualización de grilla...');
        dtInstance.ajax.reload((json: any) => {
          console.log('Grilla actualizada exitosamente con nuevos datos:', json);
        }, false); // false mantiene el estado actual de paginación y filtros
      }).catch((error: any) => {
        console.error('Error actualizando grilla:', error);
        this.mostrarError('Error al actualizar la grilla');
      });
    } else {
      console.warn('Grilla no disponible para actualización');
    }
  }

  /**
   * Mostrar mensaje de éxito
   */
  private mostrarExito(mensaje: string): void {
    Swal.fire({
      title: '¡Éxito!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000
    });
  }

  /**
   * Mostrar mensaje de error
   */
  private mostrarError(mensaje: string): void {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Mostrar mensaje de advertencia
   */
  private mostrarAdvertencia(mensaje: string): void {
    Swal.fire({
      title: 'Advertencia',
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Obtener datos de prueba para testing
   */
  private obtenerDatosPrueba(idRol: number): PermisoRol[] {
    return [
      { idPermisos: 1, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Crear Local' },
      { idPermisos: 2, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Crear Etapas' },
      { idPermisos: 3, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Crear Grupos Edades' },
      { idPermisos: 4, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Asignar Grupo por Etapa' },
      { idPermisos: 5, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Asignar Taller por Grupo' },
      { idPermisos: 6, idRol: idRol, activar: false, menu: 'Configuraciones', subMenu: 'Asignar Vacantes' },
      { idPermisos: 7, idRol: idRol, activar: true, menu: 'Configuraciones', subMenu: 'Aperturar Taller' },
      { idPermisos: 8, idRol: idRol, activar: false, menu: 'Configuraciones', subMenu: 'Asignar Docentes por Cursos' },
      { idPermisos: 9, idRol: idRol, activar: true, menu: 'Usuarios', subMenu: 'Crear Usuario' },
      { idPermisos: 10, idRol: idRol, activar: true, menu: 'Usuarios', subMenu: 'Crear Rol' }
    ];
  }
}
