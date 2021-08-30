import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { MedicosComponent } from './medicos/medicos.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
  { path: '', component: UsuarioComponent, canActivate: [SeguridadRouter] },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'medicos', component: MedicosComponent, canActivate: [SeguridadRouter] },
  { path: 'citas', component: CitasComponent, canActivate: [SeguridadRouter] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule {}
