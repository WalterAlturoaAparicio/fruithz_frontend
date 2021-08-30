import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoNuevoComponent } from './medicos/medico-nuevo.component';
import { MedicoModificarComponent } from './medicos/medico-modificar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CitasComponent } from './citas/citas.component';
import { CitaNuevaComponent } from './citas/cita-nueva.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    UsuarioComponent,
    MedicosComponent,
    MedicoNuevoComponent,
    MedicoModificarComponent,
    CitasComponent,
    CitaNuevaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [MedicoNuevoComponent, MedicoModificarComponent],
})
export class AppModule {}
