import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalComponent } from './local/local.component';
import { AulaComponent } from './aula/aula.component';
import { GrupoComponent } from './grupo/grupo.component';
import { EtapaComponent } from './etapa/etapa.component';
import { TallerComponent } from './taller/taller.component';
import { GrupotallerComponent } from './grupotaller/grupotaller.component';
import { EtapagrupoComponent } from './etapagrupo/etapagrupo.component';
import { AperturatallerComponent } from './aperturataller/aperturataller.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'local',
    pathMatch: 'full'
  },
  {
    path: 'local',
    component: LocalComponent,
    data: {
      title: 'Locales',
      breadcrumb: 'Locales'
    }
  },
  {
    path: 'aula',
    component: AulaComponent,
    data: {
      title: 'Aulas',
      breadcrumb: 'Aulas'
    }
  },
  {
    path: 'grupo',
    component: GrupoComponent,
    data: {
      title: 'Grupos',
      breadcrumb: 'Grupos'
    }
  },
  {
    path: 'etapa',
    component: EtapaComponent,
    data: {
      title: 'Etapas',
      breadcrumb: 'Etapas'
    }
  },
  {
    path: 'taller',
    component: TallerComponent,
    data: {
      title: 'Talleres',
      breadcrumb: 'Talleres'
    }
  }
  ,
  {
    path: 'grupotaller',
    component: GrupotallerComponent,
    data: {
      title: 'Grupo Taller',
      breadcrumb: 'Grupo Taller'
    }
  },
  {
    path: 'etapagrupo',
    component: EtapagrupoComponent,
    data: {
      title: 'Etapa Grupo',
      breadcrumb: 'Etapa Grupo'
    }
  },
  {
    path: 'aperturataller',
    component: AperturatallerComponent,
    data: {
      title: 'Apertura Taller',
      breadcrumb: 'Apertura Taller'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
