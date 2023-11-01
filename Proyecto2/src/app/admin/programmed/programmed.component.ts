import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-programmed',
  templateUrl: './programmed.component.html',
  styleUrls: ['./programmed.component.css']
})
export class ProgrammedComponent {
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;
  solicitudes: any = [];
  meses: any = [
    {mes:"Enero"},{mes:"Febrero"},{mes:"Marzo"},{mes:"Abril"},{mes:"Mayo"},
    {mes:"Junio"},{mes:"Julio"},{mes:"Agosto"},{mes:"Setiembre"},
    {mes:"Octubre"},{mes:"Noviembre"},{mes:"Diciembre"},];
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
