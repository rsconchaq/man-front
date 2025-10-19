import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbAccordionModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnoComponent } from './alumno/alumno.component';
import { AlumnoDetalleComponent } from './alumnoDetalle/alumnoDetalle.component';
 import { SharedModule } from 'src/app/shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModalModule,
        NgbNavModule,
        NgbDropdownModule,
        NgbAccordionModule,
        NgbTooltipModule,
        SharedModule,
        FlatpickrModule,
    AlumnosRoutingModule,
    AlumnoComponent,
    AlumnoDetalleComponent
  ]
})
export class AlumnosModule { }
