import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent {
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;
  solicitudes: any = [];
  soli: any = [];
  selected:any =[];
  destForm:any;

  constructor(private el: ElementRef, private api:ApiService, private formBuilder:FormBuilder) {
    this.destForm = this.formBuilder.group({
      destino: ''
    });
  }

  ngOnInit(): void {
    this.updateBtn = this.el.nativeElement.querySelector('#mostrarBtn');
    this.deleteBtn = this.el.nativeElement.querySelector('#ocultarBtn');
    this.container = this.el.nativeElement.querySelector('#miDiv');
    this.refreshList();
  }

  mostrarDiv(Value:any){
    console.log(Value);
    
    if(this.isClosed){
      this.isClosed = false;
      this.refreshList();
    }
    else{
      this.isClosed = true;
      this.selected = [];
      // recorrer la lista de soli y guardar en selected los que cumplan la condicion del destino
      for (let i = 0; i < this.soli.length; i++) {
        if (this.soli[i].destino == Value.destino) {
          this.selected.push(this.soli[i])
        }      
      }
    }
  }

  refreshList(){
    // hacer el get de usuarios ----->
    this.solicitudes =[]
    this.soli =[]
    this.api.getCollab().subscribe(data=>{
      this.solicitudes = data; // con esto tengo todos los usuarios 
      console.log(this.solicitudes);      
      console.log(this.solicitudes[0].solicitudes[0]);
      for (let i = 0; i < this.solicitudes.length; i++) { // para cada usuario en lista
        for (let j = 0; j < this.solicitudes[i].solicitudes.length; j++) { // para cada solicitud del usuario
          // haga una solicitud nueva y la agrega a una lista que es la que va a mostrar
          let temp = {
            id:this.solicitudes[i].id,
            nombre:this.solicitudes[i].nombre,
            correo:this.solicitudes[i].correo,
            contra:this.solicitudes[i].contra,
            puesto:this.solicitudes[i].puesto,
            depa:this.solicitudes[i].depa,
            tipo:this.solicitudes[i].solicitudes[j].tipo,
            destino:this.solicitudes[i].solicitudes[j].destino,
            motivo:this.solicitudes[i].solicitudes[j].motivo,
            inicio:this.solicitudes[i].solicitudes[j].inicio,
            final:this.solicitudes[i].solicitudes[j].final,
            aerolinea:this.solicitudes[i].solicitudes[j].aerolinea,
            alojamiento:this.solicitudes[i].solicitudes[j].alojamiento,
            precio:this.solicitudes[i].solicitudes[j].precio,
            transporte:this.solicitudes[i].solicitudes[j].transporte,
            estado:this.solicitudes[i].solicitudes[j].estado
          }
          
          this.soli.push(temp)     
        }
      }
      console.log(this.soli);
    }); 
  }

  obtenerMeses(){
    
  }
  obtenerAos(){

  }
}
