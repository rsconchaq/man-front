import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Routing
import { UsuariosRoutingModule } from './usuarios-routing.module';

// Components  
import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { PermisoRolComponent } from './permisorol/permisorol.component';

// Services
import { UsuarioService } from '../../core/services/usuario.service';
import { RolService } from '../../core/services/rol.service';
import { PermisoRolService } from '../../core/services/permiso-rol.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsuarioComponent,
    RolComponent,
    PermisoRolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    UsuariosRoutingModule
  ],
  providers: [
    UsuarioService,
    RolService,
    PermisoRolService
  ],
  exports: [
    UsuarioComponent,
    RolComponent,
    PermisoRolComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuariosModule { }