import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ViajesProgramadosComponent } from './components/viajes-programados/viajes-programados.component';
import { ViajesInternacionalesComponent } from './components/viajes-internacionales/viajes-internacionales.component';
import { SolicitudesPendientesComponent } from './components/solicitudes-pendientes/solicitudes-pendientes.component';
import { DestinosComponent } from './components/destinos/destinos.component';


const routes: Routes = [


  {path: '', pathMatch:'full', redirectTo:'viajes-programados'},
  {path:'viajes-programados', component:ViajesProgramadosComponent},
  {path:'viajes-internacionales', component:ViajesInternacionalesComponent},
  {path:'solicitudes-pendientes', component:SolicitudesPendientesComponent},
  {path:'destinos', component:DestinosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
