import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinosComponent } from './components/destinos/destinos.component';
import { SolicitudesPendientesComponent } from './components/solicitudes-pendientes/solicitudes-pendientes.component';
import { ViajesInternacionalesComponent } from './components/viajes-internacionales/viajes-internacionales.component';
import { ViajesProgramadosComponent } from './components/viajes-programados/viajes-programados.component';


@NgModule({
  declarations: [
    AppComponent,
    DestinosComponent,
    SolicitudesPendientesComponent,
    ViajesInternacionalesComponent,
    ViajesProgramadosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
