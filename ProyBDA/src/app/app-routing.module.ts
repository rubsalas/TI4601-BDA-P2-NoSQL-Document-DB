import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ViajesProgramadosComponent } from './components/viajes-programados/viajes-programados.component';
import { ViajesInternacionalesComponent } from './components/viajes-internacionales/viajes-internacionales.component';
import { SolicitudesComponent } from './components/solicitudes-pendientes/solicitudes-pendientes.component';
import { DestinosComponent } from './components/destinos/destinos.component';


const routes: Routes = [


  {path: '', pathMatch:'full', redirectTo:'viajes-programados'},
  {path:'viajes-programados', component:ViajesProgramadosComponent},
  {path:'viajes-internacionales', component:ViajesInternacionalesComponent},
 {path:'solicitudes-pendientes', component:SolicitudesComponent},
  {path:'destinos', component:DestinosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],


})
export class AppRoutingModule { }
