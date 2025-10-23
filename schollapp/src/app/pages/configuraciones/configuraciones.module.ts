import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { LocalComponent } from './local/local.component';
import { AulaComponent } from './aula/aula.component';
import { GrupoComponent } from './grupo/grupo.component';
import { EtapaComponent } from './etapa/etapa.component';
import { TallerComponent } from './taller/taller.component';
import { GrupotallerComponent } from './grupotaller/grupotaller.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EtapagrupoComponent } from './etapagrupo/etapagrupo.component';
import { AperturatallerComponent } from './aperturataller/aperturataller.component';
import { DualListboxComponent } from '../../shared/dual-listbox/dual-listbox.component';

@NgModule({
  declarations: [
    LocalComponent,
    AulaComponent,
    EtapaComponent,
    TallerComponent,
     GrupotallerComponent,
    EtapagrupoComponent,
    AperturatallerComponent,
    GrupoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModalModule,
    NgSelectModule,
    DualListboxComponent,
    ConfiguracionesRoutingModule
  ]
})
export class ConfiguracionesModule { }
