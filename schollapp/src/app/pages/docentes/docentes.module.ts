import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteComponent } from './docente/docente.component';
import { DocentesRoutingModule } from './docentes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DocenteComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModalModule,
    
    DocentesRoutingModule
  ]
})
export class DocentesModule {}
