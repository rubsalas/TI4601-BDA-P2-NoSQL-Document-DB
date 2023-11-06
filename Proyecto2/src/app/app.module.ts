import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './collaborators/register/register.component';
import { ModifyComponent } from './collaborators/modify/modify.component';
import { HistoryComponent } from './collaborators/history/history.component';
import { ValorationComponent } from './admin/valoration/valoration.component';
import { ProgrammedComponent } from './admin/programmed/programmed.component';
import { InternationalComponent } from './admin/international/international.component';
import { DestinationComponent } from './admin/destination/destination.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModifyComponent,
    HistoryComponent,
    ValorationComponent,
    ProgrammedComponent,
    InternationalComponent,
    DestinationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      /**rutas para mostrar los diferentes componentes de la aplicacion */
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'modify', component: ModifyComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'destination', component: DestinationComponent},
      {path: 'international', component: InternationalComponent},
      {path: 'programmed', component: ProgrammedComponent},
      {path: 'valoration', component: ValorationComponent},

      /**rutas para redireccion a la pagina principal o a la pagina 404 de error */
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
