import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent {
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;
  solicitudes: any = [];
  meses: any = [
    {mes:"Trimestre 1"},{mes:"Trimestre 2"},{mes:"Trimestre 3"}];
  annos: any = [];

  constructor(private el: ElementRef, private api:ApiService) {}

  ngOnInit(): void {
    this.updateBtn = this.el.nativeElement.querySelector('#mostrarBtn');
    this.deleteBtn = this.el.nativeElement.querySelector('#ocultarBtn');
    this.container = this.el.nativeElement.querySelector('#miDiv');
  }

  mostrarDiv(){
    if(this.isClosed){
      this.isClosed = false;
      this.refreshList();
    }
    else{
      this.isClosed = true;
    }
  }

  // metodo para obtener los datos de la base de datos
  refreshList(){
    this.api.getUsers().subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
      
      // para obtener los meses y aos disponibles en la lista
      for (let i = 0; i < this.solicitudes.length; i++) {
        const element = this.solicitudes[i];
        for (let j = 0; j < this.meses.length; j++) {
          const element = this.meses[j];
          
        }
      }
    });
  }

  obtenerMeses(){
    
  }
  obtenerAos(){

  }
}
