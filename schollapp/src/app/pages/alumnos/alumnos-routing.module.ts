import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { AlumnoDetalleComponent } from './alumnoDetalle/alumnoDetalle.component';

const routes: Routes = [
  { path: '', component: AlumnoComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'alumno-detalle/:id', component: AlumnoDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
