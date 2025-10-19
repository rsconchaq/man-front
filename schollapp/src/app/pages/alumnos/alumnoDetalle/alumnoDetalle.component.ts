import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, TemplateRef, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModalModule, NgbModal, NgbDateStruct, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { AlumnoService } from '../../../core/services/alumno.service';
import { TallerService } from '../../../core/services/taller.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Alumno } from "src/app/core/models/alumno.model";
import { CommonModule } from "@angular/common";
import { cu, s } from "node_modules/@fullcalendar/core/internal-common";

// Formateador personalizado para dd/MM/yyyy
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 3) {
        return {
          day: parseInt(dateParts[0], 10),
          month: parseInt(dateParts[1], 10),
          year: parseInt(dateParts[2], 10)
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? 
      `${this.padNumber(date.day)}/${this.padNumber(date.month)}/${date.year}` : 
      '';
  }

  private padNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
 

export interface CuotaDetalle {
    idCuota: number;
    monto: number;
    numeroCuota: number;
    fechaVencimiento: Date;
    estadoPago: 'Pendiente' | 'Pagado' | 'Vencido';
    tipoPago?: string;
    seleccionadoPagar: boolean;
    seleccionadoBoleta: boolean;
    observacion: string;
    divisiones: any[];
}

@Component({
  selector: 'app-alumnoDetalle',
  templateUrl: './alumnoDetalle.component.html',
  styleUrls: ['./alumnoDetalle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbTooltipModule
],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AlumnoDetalleComponent implements OnInit {

    userData: any;
    alumnoId: number | null = null;
 
    alumnoForm: FormGroup;
    apoderadosAlumno: any[] = [];
    talleresList: any[] = [];
    
    // Modal
    @ViewChild('tallerDetalleModal', { static: true }) tallerDetalleModalTemplate!: TemplateRef<any>;
    modalRef: any;
    tallerSeleccionado: any = null;
    activeTabModal: number = 1;
    
    // Datos de seguimiento y cuotas
    seguimientoList: any[] = [];
    cuotasList: CuotaDetalle[] = [];
    
    // Control de checks y botones
    hayChecksPagarSeleccionados: boolean = false;
    hayChecksBoletaSeleccionados: boolean = false;
    
    // Control de filas expandidas
    cuotasExpandidas: Set<number> = new Set();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly alumnoService: AlumnoService,
        private readonly tallerService: TallerService,
        private readonly formBuilder: FormBuilder,
        private readonly modalService: NgbModal
    ) {
        // Inicializar el formulario en el constructor
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

    ngOnInit(): void {
        // Obtener el ID de la URL
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.alumnoId = Number(id);
                this.cargarDatosAlumno(this.alumnoId);
                this.cargarTalleresAlumno(this.alumnoId);
            }
        });
    }

    cargarTalleresAlumno(idAlumno: number): void {
        // Aquí deberías llamar al servicio que obtiene los talleres del alumno
        // Por ahora, voy a usar datos de ejemplo
        Swal.fire({
            title: 'Cargando talleres Matriculados...',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        this.alumnoService.listarTalleresMatriculados(idAlumno).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.talleresList = response.data;
                }
            },
            error: (error: any) => {
                console.error('Error al cargar talleres:', error);
            }
        });
 } 
    


    cargarDatosAlumno(id: number): void {

        Swal.fire({
            title: 'Cargando datos del alumno...',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        this.alumnoService.obtenerAlumno(id).subscribe({
            next: (response) => {
                Swal.close();
                if (response.success) {
                    const alumno = response.data as Alumno;
                    this.alumnoForm.patchValue(response.data);
                    
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

                } else {
                    Swal.fire('Error', 'No se pudo cargar los datos del alumno', 'error');
                }
            },
            error: (error) => {
                console.error('Error al cargar alumno:', error);
                Swal.fire('Error', 'No se pudo cargar los datos del alumno', 'error');
            }
        });
    }

    abrirDetalleTaller(taller: any): void {
        this.tallerSeleccionado = taller;
        this.activeTabModal = 1;
        this.cargarSeguimiento(taller);
        this.cargarCuotas(taller);
        this.modalRef = this.modalService.open(this.tallerDetalleModalTemplate, {
            size: 'xl',
            centered: true,
            backdrop: 'static'
        });
    }

    cargarSeguimiento(taller: any): void {
        // Datos de ejemplo para seguimiento de sesiones

        Swal.fire({
            title: 'Cargando seguimiento...',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        this.alumnoService.listarSeguimientoTallerMatriculado(taller.idMatricula).subscribe({
            next: (response) => {
                Swal.close();
                this.seguimientoList = response.data;
            },
            error: (error) => {
                Swal.close();
                console.error('Error al cargar seguimiento:', error);
            }
        });
    }

    actualizarSeguimiento(sesion: any): void {
        // Datos de ejemplo para actualizar seguimiento de sesiones
        Swal.fire({
            title: 'Actualizando seguimiento...',
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const data =   sesion;
        this.alumnoService.actualizarSeguimientoMatriculados(data).subscribe({
            next: (response) => {
                 
                if (response.success && response.data == 1 ) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'El seguimiento se ha actualizado correctamente',
                        showConfirmButton: true
                    });
                    this.cargarSeguimiento(sesion);
                }else{
                    Swal.fire('Información', 'No se pudo actualizar el seguimiento', 'warning');
                }

                
            },
            error: (error) => {
                Swal.close();
                console.error('Error al actualizar seguimiento:', error);
            }
        });
    }

    cargarCuotas(taller: any): void {
        // Datos de ejemplo para cuotas de matrícula

        Swal.fire({
            title: 'Cargando cuotas...',
            didOpen: () => {
                Swal.showLoading();
            }
        });
        this.alumnoService.listarCuotasTallerMatriculado(taller.idMatricula).subscribe({
            next: (response: any) => {

                Swal.close();
                this.cuotasList = response.data;

                this.cuotasList.forEach((cuota: any) => {
                    cuota.divisiones = JSON.parse(cuota.divisiones);
 
                });
                console.log('cuotasList1', this.cuotasList);
                this.cuotasList = this.cuotasList.map(cuota => {
                     cuota.divisiones = cuota.divisiones.map((div: any) => ({
                        ...div,
                         seleccionadoPagar: div.seleccionadoPagar == 1,
                        seleccionadoBoleta: div.seleccionadoBoleta == 1
                    }));
                    return cuota;
                });

                console.log('cuotasList2', this.cuotasList);
                console.log('cuotasList', this.cuotasExpandidas);
            },
            error: (error) => {
                    Swal.close();
                console.error('Error al cargar cuotas:', error);
            }
        });
    }

         
 

    agregarCuota(): void {
        const nuevoCuotaNumero = this.cuotasList.length;
        const nuevaCuota: CuotaDetalle = {
            idCuota: 0,
            numeroCuota: nuevoCuotaNumero,
            monto: 0,
            fechaVencimiento: new Date(),
            estadoPago: 'Pendiente',
            tipoPago: 'Pago Efectivo',
            observacion: '',
            seleccionadoPagar: false,
            seleccionadoBoleta: false,
            divisiones: []
        };


        let data = {
            flag: 1,
            idCuota: 0,
            numeroCuota: this.cuotasList.length + 1,
            monto: 0,
            fechaVencimiento: '',
            fechaPago: '',
            estadoPago: "Pendiente",
            observacion: "Pendiente",
            idMatricula: this.tallerSeleccionado.idMatricula,
            idAlumno: this.tallerSeleccionado.idAlumno,
            nombres: "",
            apellidos: "",
            descripcionGrupo: "",
            descripcionEtapa: "",
            local: ""
};

console.log('Registrar nueva cuota: 1', data);
 
        this.alumnoService.registrarCuotaPago(data).subscribe({
            next: (response) => {
                if (response.success) {
                    this.cargarCuotas(this.tallerSeleccionado);
 
                    Swal.fire({
                        icon: 'success',
                        title: 'Cuota Agregada',
                        text: `Se agregó la cuota #${nuevoCuotaNumero}`,
                        showConfirmButton: true
                    });
                 }
            }
        });
 
    }

    eliminarCuota(index: number): void {
        const cuota = this.cuotasList[index];
        
        // Validar si la cuota está pagada
        if (cuota.estadoPago === 'Pagado') {
            Swal.fire({
                icon: 'error',
                title: 'No se puede eliminar',
                text: 'No se puede eliminar una cuota que ya está pagada',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        Swal.fire({
            title: '¿Está seguro?',
            text: `¿Desea eliminar la cuota #${cuota.numeroCuota}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                const cuota = this.cuotasList[index];

                let data = {
                    ...cuota,
                    flag: 3,
                    seleccionadoBoleta:false,
                    seleccionadoPagar:false,
                    divisiones:''
                };
                console.log('Eliminar cuota: 3', data);
                // Renumerar las cuotas
                  this.alumnoService.registrarCuotaPago(data).subscribe({
                    next: (response) => {
                        if(response.success && response.data == 1) {
                            Swal.fire({
                            icon: 'success',
                            title: 'Eliminada',
                            text: `La cuota #${cuota.numeroCuota} ha sido eliminada correctamente`,
                            confirmButtonText: 'Entendido'
                        });
                        this.cargarCuotas(this.tallerSeleccionado);
                        }
                        
                    },
                    error: (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al guardar la cuota',
                        });
                    }
                });
                
            }
        });
    }

    registrarCuotaPago(cuota: any, index: number): void {
        console.log('Registrar cuota 2:', cuota);
        // Validar que los campos obligatorios estén completos
        if (!cuota.monto || cuota.monto <= 0) {
            Swal.fire('Error', 'Debe ingresar un monto válido', 'error');
            return;
        }
        if (!cuota.fechaVencimiento) {
            Swal.fire('Error', 'Debe seleccionar una fecha de vencimiento', 'error');
            return;
        }
                let   data = {
            flag: 2,
            idCuota: cuota.idCuota,
            numeroCuota: cuota.numeroCuota,
            monto: cuota.monto,
            fechaVencimiento: cuota.fechaVencimiento,
            fechaPago: cuota.fechaPago ? cuota.fechaPago : "",
            estadoPago: cuota.estadoPago ? cuota.estadoPago : "Pendiente",
            observacion: cuota.observacion ? cuota.observacion : "Pendiente",
            idMatricula: cuota.idMatricula,
            idAlumno: cuota.idAlumno,
            nombres: cuota.nombres ? cuota.nombres : "",
            apellidos: cuota.apellidos ? cuota.apellidos : "",
            descripcionGrupo: cuota.descripcionGrupo ? cuota.descripcionGrupo : "",
            descripcionEtapa: cuota.descripcionEtapa ? cuota.descripcionEtapa : "",
            local: cuota.local ? cuota.local : ""
};
         this.alumnoService.registrarCuotaPago(data).subscribe({
            next: (response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: `La cuota #${cuota.nroCuota} ha sido guardada correctamente`,
                });
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al guardar la cuota',
                });
            }
        });
    }
    registrarCuotaPagoDetalle( cuota:any,  division: any, indexDivision: number): void {
        // Validar que los campos obligatorios estén completos
        if (!division.monto || division.monto <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un monto válido',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        if (!division.fechaVencimiento) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar una fecha de vencimiento',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }


        console.log('Registrar cuota detalle 2:', cuota, division);

        
                let   data = {
            flag: 2,
            idCuota: cuota.idCuota,
            numeroCuota: division.nroDivision,
            monto: division.monto,
            fechaVencimiento: division.fechaVencimiento,
            fechaPago: division.fechaPago ? division.fechaPago : "",
            estadoPago: division.estadoPago ? division.estadoPago : "Pendiente",
            observacion: division.observacion ? division.observacion : "Pendiente",
            idMatricula: cuota.idMatricula,
            idAlumno: cuota.idAlumno,
            seleccionadoPagar: division.seleccionadoPagar,
            seleccionadoBoleta: division.seleccionadoBoleta,
            tipoPago: division.tipoPago,
            nombres: cuota.nombres ? cuota.nombres : "",
            apellidos: cuota.apellidos ? cuota.apellidos : "",
            descripcionGrupo: cuota.descripcionGrupo ? cuota.descripcionGrupo : "",
            descripcionEtapa: cuota.descripcionEtapa ? cuota.descripcionEtapa : "",
            local: cuota.local ? cuota.local : "",
            divisiones:   ""
        };

           


                

        this.alumnoService.registrarCuotaPagoDetalle(data).subscribe({
            next: (response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: `La cuota #${cuota.nroCuota} - División #${division.nroDivision} ha sido guardada correctamente`,
                });
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al guardar la cuota',
                });
            }
        });
    }

    calcularTotalDivisiones(cuota: any, division: any,index :number): number {
        if (!cuota.divisiones || cuota.divisiones.length === 0) {
            return 0;
        }
        // comparar si la sumatoria de los monetos de las divisiones supera al moneot de la cuota.monto o es menor
        const totalDivisiones = cuota.divisiones.reduce((total: number, division: any) => total + division.monto, 0);
        if (totalDivisiones > cuota.monto) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `La suma de las divisiones S/. ${totalDivisiones.toFixed(2)} supera el monto de la cuota S/. ${cuota.monto.toFixed(2)}`,
                showConfirmButton: true
            });
            // poner la diferencia en la division actual
            const diferencia = totalDivisiones - cuota.monto;
            cuota.divisiones[index].monto = parseFloat((division.monto - diferencia).toFixed(2));
            return 0;
        }
        if (totalDivisiones < cuota.monto) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `La suma de las divisiones S/. ${totalDivisiones.toFixed(2)} es menor al monto de la cuota S/. ${cuota.monto.toFixed(2)}`,
                showConfirmButton: true
            });
            
            return 0;
        }

        return totalDivisiones;
    }

    onCheckPagarChange(cuota: any): void {
        // Actualizar el estado de los botones
        this.actualizarEstadoBotones();
    }

    onCheckBoletaChange(cuota: any): void {
        // Actualizar el estado de los botones
        this.actualizarEstadoBotones();
    }

    actualizarEstadoBotones(): void {
        // Verificar si hay checks de pagar seleccionados
        this.hayChecksPagarSeleccionados = this.cuotasList.some(c => c.divisiones.some(d => d.seleccionadoPagar && c.estadoPago != 'Pagado'));
        
        // Verificar si hay checks de boleta seleccionados
        this.hayChecksBoletaSeleccionados = this.cuotasList.some(c => c.divisiones.some(d => d.seleccionadoBoleta && c.estadoPago == 'Pagado'));
    }

    toggleExpansionCuota(index: number): void {
        if (this.cuotasExpandidas.has(index)) {
            this.cuotasExpandidas.delete(index);
        } else {
            this.cuotasExpandidas.add(index);
        }
        console.log('Cuotas expandidas:', this.cuotasExpandidas);
    }

    estaExpandida(index: number): boolean {
        return this.cuotasExpandidas.has(index);
    }

    dividirCuota(cuota: any, index: number): void {
        Swal.fire({
            title: 'Dividir Cuota',
            html: `
                <div class="text-start">
                    <p>Cuota actual: ${cuota.nroCuota === 0 ? 'Matrícula' : 'Cuota #' + cuota.nroCuota}</p>
                    <p>Monto actual: S/. ${cuota.monto}</p>
                    <label for="cantidadDivisiones" class="form-label mt-3">¿En cuántas partes desea dividir?</label>
                    <input type="number" id="cantidadDivisiones" class="swal2-input" min="2" max="12" value="2">
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Dividir',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const cantidadInput = document.getElementById('cantidadDivisiones') as HTMLInputElement;
                const cantidad = parseInt(cantidadInput.value);
                
                if (!cantidad || cantidad < 2) {
                    Swal.showValidationMessage('Debe ingresar al menos 2 divisiones');
                    return false;
                }
                if (cantidad > 12) {
                    Swal.showValidationMessage('No puede dividir en más de 12 partes');
                    return false;
                }
                return cantidad;
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const cantidad = result.value;
                const montoPorDivision = cuota.monto / cantidad;
                
                // Limpiar divisiones anteriores
                cuota.divisiones = [];
                
                // Crear las divisiones
                for (let i = 1; i <= cantidad; i++) {
                    cuota.divisiones.push({
                        nroDivision: i,
                        monto: parseFloat(montoPorDivision.toFixed(2)),
                        fechaVencimiento: '',
                        tipoPago: cuota.tipoPago,
                        estadoPago: 'Pendiente',
                        observacion: `División ${i} de ${cantidad}`,
                        seleccionadoPagar: false,
                        seleccionadoBoleta: false
                    });
                }
                
                // Expandir automáticamente la cuota
                this.cuotasExpandidas.add(index);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Cuota Dividida',
                    text: `La cuota se dividió en ${cantidad} partes de S/. ${montoPorDivision.toFixed(2)} cada una`,
                    timer: 2500,
                    showConfirmButton: false
                });
            }
        });
    }

    agregarDivision(cuota: any, index: number): void {
        // Inicializar el array de divisiones si no existe
        if (!cuota.divisiones) {
            cuota.divisiones = [];
        }
        
        const numeroDivision = cuota.divisiones.length + 1;
        const nuevaDivision = {
            nroDivision: numeroDivision,
            monto: 0,
            fechaVencimiento: '',
            tipoPago: cuota.tipoPago,
            estadoPago: 'Pendiente',
            observacion: `División ${numeroDivision}`,
            seleccionadoPagar: false,
            seleccionadoBoleta: false
        };

            let   data = {
            flag: 1,
            idCuota: cuota.idCuota,
            numeroCuota: numeroDivision,
            monto: 0,
            fechaVencimiento: '',
            fechaPago: '',
            estadoPago: 'Pendiente',
            observacion: 'Pendiente',
            idMatricula: cuota.idMatricula,
            idAlumno: cuota.idAlumno,
            seleccionadoPagar: false,
            seleccionadoBoleta: false,
            tipoPago: '0',
            nombres: cuota.nombres ? cuota.nombres : "",
            apellidos: cuota.apellidos ? cuota.apellidos : "",
            descripcionGrupo: cuota.descripcionGrupo ? cuota.descripcionGrupo : "",
            descripcionEtapa: cuota.descripcionEtapa ? cuota.descripcionEtapa : "",
            local: cuota.local ? cuota.local : "",
            divisiones:   ""
        };
        
        //cuota.divisiones.push(nuevaDivision);
        
        // Expandir automáticamente la cuota para mostrar la nueva división
        //this.cuotasExpandidas.add(index);
        
        Swal.fire({
            icon: 'success',
            title: 'División Agregada',
            text: `Se agregó la división #${numeroDivision}`,
            timer: 2000,
            showConfirmButton: false
        });



        this.alumnoService.registrarCuotaPagoDetalle(data).subscribe({
            next: (response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'División Registrada',
                    text: `Se registró la división #${numeroDivision}`,
                    timer: 2000,
                    showConfirmButton: false
                });
                this.cargarCuotas(this.tallerSeleccionado);
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al registrar la división',
                });
            }

        });

    }

    eliminarDivision(cuota: any, division:any, indexDivision: number): void {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Se eliminará esta división de la cuota',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            
                
                  let   data = {
            flag: 3,
            idCuota: cuota.idCuota,
            numeroCuota: division.nroDivision,
            monto: division.monto,
            fechaVencimiento: division.fechaVencimiento,
            fechaPago: division.fechaPago ? division.fechaPago : "",
            estadoPago: division.estadoPago ? division.estadoPago : "Pendiente",
            observacion: division.observacion ? division.observacion : "Pendiente",
            idMatricula: cuota.idMatricula,
            idAlumno: cuota.idAlumno,
            seleccionadoPagar: division.seleccionadoPagar,
            seleccionadoBoleta: division.seleccionadoBoleta,
            tipoPago: division.tipoPago,
            nombres: cuota.nombres ? cuota.nombres : "",
            apellidos: cuota.apellidos ? cuota.apellidos : "",
            descripcionGrupo: cuota.descripcionGrupo ? cuota.descripcionGrupo : "",
            descripcionEtapa: cuota.descripcionEtapa ? cuota.descripcionEtapa : "",
            local: cuota.local ? cuota.local : "",
            divisiones:   ""
        };

               this.alumnoService.registrarCuotaPagoDetalle(data).subscribe({
                    next: (response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminada',
                            text: 'La división ha sido eliminada correctamente',
                        });

                        this.cargarCuotas( this.tallerSeleccionado );
                    },
                    error: (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar la división',
                        });
                    }
                });
            }
        });
    }

    pagarCuotasSeleccionadas(): void {

        // filtrarar las divisiones seleccionadas para pagar de la lista de cuotaList.diviciones.seleccionadoPagar a una lista nueva
        const cuotasAPagar = this.cuotasList.flatMap(c => c.divisiones.filter(d => d.seleccionadoPagar == true && c.estadoPago != 'Pagado'));
 
        console.log('cuotasList', this.cuotasList);
        console.log('cuotasAPagar', cuotasAPagar);
        if (cuotasAPagar.length === 0) {
            Swal.fire('Advertencia', 'Debe seleccionar al menos una cuota para pagar', 'warning');
            return;
        }

        // Validar que todas las cuotas tengan monto y fecha
        const cuotasInvalidas = cuotasAPagar.filter(c => !c.monto || c.monto <= 0 || !c.fechaVencimiento);
        if (cuotasInvalidas.length > 0) {
            Swal.fire('Error', 'Todas las cuotas deben tener un monto válido y fecha de vencimiento', 'error');
            return;
        }

        const totalPagar = cuotasAPagar.reduce((sum, c) => sum + Number(c.monto), 0);

        Swal.fire({
            title: 'Confirmar Pago',
            html: `
                <p>¿Está seguro de pagar las siguientes cuotas?</p>

                <select class="form-select form-select-sm" id="selectTipoPago">
                        <option value="0">Seleccione</option>
                        <option value="1">Pago Efectivo</option>
                        <option value="2">Pago Post</option>
                        <option value="3">Pago Yape</option>
 -                      <option value="4">Pago Link</option>
               </select>

                <ul class="text-start">
                    ${cuotasAPagar.map(c => `<li>Cuota #${c.nroDivision}: S/ ${c.monto}</li>`).join('')}
                </ul>
                <p class="fw-bold mt-3">Total a pagar: S/ ${totalPagar.toFixed(2)}</p>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, pagar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#28a745'
        }).then((result) => {
            if (result.isConfirmed) {

                const selectElement = document.getElementById('selectTipoPago') as HTMLSelectElement;
                const tipoPagoValue = selectElement.value;

                // Marcar las cuotas como pagadas
                cuotasAPagar.forEach(cuota => {
                    cuota.estadoPago = 'Pagado';
                    cuota.tipoPago = tipoPagoValue; 
                    cuota.observacion = 'Pagado';
                    cuota.flag = 4;
                    cuota.numeroCuota = cuota.nroDivision;
                });

                console.log('Cuotas a pagar actualizadas:', cuotasAPagar);


                this.alumnoService.registrarPagoCuotaDetalleMatricula(cuotasAPagar).subscribe({
                    next: (response) => {
                        if (response.success) {
                            this.cargarCuotas(this.tallerSeleccionado);
                              Swal.fire({
                    icon: 'success',
                    title: 'Pago Exitoso',
                    text: `Se han pagado ${cuotasAPagar.length} cuota(s) por un total de S/ ${totalPagar.toFixed(2)}`,
                    timer: 3000,
                    showConfirmButton: false
                });

                         }
                    },
                    error: (error) => {
                        Swal.fire('Error', 'Ocurrió un error al registrar el pago', 'error');
                    }
                });

              
            }
        });
    }

    imprimirBoletasSeleccionadas(): void {
        const cuotasParaBoleta = this.cuotasList.filter(c => c.seleccionadoBoleta);
        
        if (cuotasParaBoleta.length === 0) {
            Swal.fire('Advertencia', 'Debe seleccionar al menos una cuota para generar boleta', 'warning');
            return;
        }

        const totalBoleta = cuotasParaBoleta.reduce((sum, c) => sum + Number(c.monto), 0);

        Swal.fire({
            title: 'Generar Boleta',
            html: `
                <p>Se generará boleta para las siguientes cuotas:</p>
                <ul class="text-start">
                    ${cuotasParaBoleta.map(c => `<li>Cuota #${c.numeroCuota}: S/ ${c.monto}</li>`).join('')}
                </ul>
                <p class="fw-bold mt-3">Total: S/ ${totalBoleta.toFixed(2)}</p>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Generar e Imprimir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#007bff'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí llamarías al servicio para generar la boleta
                // this.tallerService.generarBoleta(cuotasParaBoleta).subscribe(...)
                
                Swal.fire({
                    icon: 'success',
                    title: 'Boleta Generada',
                    text: 'La boleta se ha generado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });

                // Desmarcar los checks después de generar la boleta
                cuotasParaBoleta.forEach(cuota => {
                    cuota.seleccionadoBoleta = false;
                });

            }
        });
    }

    cerrarModal(): void {
        if (this.modalRef) {
            this.modalRef.close();
            this.modalRef = null;
        }
        this.tallerSeleccionado = null;
        this.hayChecksPagarSeleccionados = false;
        this.hayChecksBoletaSeleccionados = false;
    }

}