import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './docente/docente.component';

const routes: Routes = [
  { path: '', component: DocenteComponent },
  { path: 'docente', component: DocenteComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentesRoutingModule {}
