import { Component, OnInit } from '@angular/core'; 
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Proyecto2';
  isClosed = false;
  isColab: boolean = true;
  isAdmin: boolean = false;
  mostrarColabBtn: boolean = false;
  mostrarAdminBtn: boolean = false; 
  closeBtn: boolean = false;

  constructor(private api:ApiService){ }

  ngOnInit(): void {
    const trigger = document.querySelector('.hamburger') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;
    trigger.addEventListener('click', () => this.hamburgerCross());

    const offcanvasToggle = document.querySelector('[data-toggle="offcanvas"]') as HTMLElement;
    offcanvasToggle.addEventListener('click', () => this.toggleOffcanvas());
    this.checkLogged();
  }

  // funcion para verificar si el usuario inicio sesion
  checkLogged(){
    // hacer get de servicio para ver si esta logeado o no y actualizar la variable logged a true o false
    // modificar estas condiciones para mostrar solo los botones del usuario loggeado

    if(this.isColab){
      this.mostrarColabBtn = true;
      this.closeBtn = true;
    }
    if(this.isAdmin){
      this.mostrarAdminBtn = true;
      this.closeBtn = true;
    }
  }

  // Cerrar sesion
  cerrarSesion(){
    this.isColab = false;
    this.isAdmin = false;
    this.mostrarColabBtn = false;
    this.mostrarAdminBtn = false;
    this.api.setLoggedAdmin(false);
    this.api.setLoggedCollab(false);
  }

  //----------------------------------------------->
  // Funciones para el menu desplegable
  //----------------------------------------------->
  hamburgerCross() {
    const trigger = document.querySelector('.hamburger') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;

    if (this.isClosed) {
      overlay.style.display = 'none';
      trigger.classList.remove('is-open');
      trigger.classList.add('is-closed');
      this.isClosed = false;
    } else {
      overlay.style.display = 'block';
      trigger.classList.remove('is-closed');
      trigger.classList.add('is-open');
      this.isClosed = true;
    }
  }

  toggleOffcanvas() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }
}



