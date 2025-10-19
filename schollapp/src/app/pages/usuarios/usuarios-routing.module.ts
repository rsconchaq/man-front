import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { PermisoRolComponent } from './permisorol/permisorol.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full'
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    data: {
      title: 'Gestión de Usuarios',
      breadcrumb: 'Usuario'
    }
  },
  {
    path: 'rol',
    component: RolComponent,
    data: {
      title: 'Gestión de Roles',
      breadcrumb: 'Rol'
    }
  },
  {
    path: 'rol-permiso',
    component: PermisoRolComponent,
    data: {
      title: 'Permisos por Rol',
      breadcrumb: 'Permisos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }