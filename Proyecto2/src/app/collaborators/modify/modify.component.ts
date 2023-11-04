import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit{
  isClosed = false;
  registerForm: any;
  solicitudes: any = [];
  realizadas: any = [];

  constructor (private api:ApiService, private formBuilder:FormBuilder){
    this.registerForm = this.formBuilder.group({
      tipo: '',
      destino:'',
      motivo:'',
      inicio:'',
      fin:'',
      aerolinea:'',
      precio:'',
      alojamiento:'',
      transporte:''
    });
  }

  ngOnInit(): void {
    this.getViajes();
  }

  // obtener los viajes solicitados
  getViajes(){
    this.api.getSolicitudes().subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
      // filtrar peticiones por nombre de usuario loggeado
      for (let i = 0; i < this.solicitudes.length; i++) {
        // guardarlas en la lista solicitudes
        if(this.solicitudes[i] == this.api.user.id){
          this.realizadas.push(this.solicitudes[i])
        }        
      }
    });
  }

  mostrarDiv(){
    if(this.isClosed){
      this.isClosed = false;
    }
    else{
      this.isClosed = true;
    }
  }

  onSubmit(invData:any){
    let tempData = {
      id: this.api.user.id,
      tipo: invData.tipo,
      destino:invData.destino,
      motivo:invData.motivo,
      inicio:invData.inicio,
      fin:invData.fin,
      aerolinea:invData.aerolinea,
      precio:invData.precio,
      alojamiento:invData.alojamiento,
      transporte:invData.transporte,
      estado:"Pendiente"
    }
    console.log(invData);
    
    this.api.addSolicitud(tempData).subscribe( // si no sirve, usar stringify
      response => {
        // Maneja la respuesta del servidor aquí
        console.log('Respuesta del servidor:', response);
      },
      error => {
        // Maneja los errores aquí
        console.error('Error en la solicitud POST:', error);
      }
    );
    const formulario = document.getElementById("miFormulario") as HTMLFormElement;
    formulario.reset();
  }

  eliminar(){
    // funcion para eliminar el viaje
  }

}
