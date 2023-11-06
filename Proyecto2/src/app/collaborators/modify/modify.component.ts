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
  modifyForm:any;
  solicitudes: any = [];
  rid:any
  //    dleafe9@dailymotion.com
  //    rQ68f`

  constructor (private api:ApiService, private formBuilder:FormBuilder){
    this.registerForm = this.formBuilder.group({
      id:'',
      tipo: '',
      destino:'',
      motivo:'',
      inicio:'',
      final:'',
      aerolinea:'',
      precio:'',
      alojamiento:'',
      transporte:'',
      estado:''
    });
    this.modifyForm = this.formBuilder.group({
      tipo: '',
      destino:'',
      motivo:'',
      inicio:'',
      final:'',
      aerolinea:'',
      precio:'',
      alojamiento:'',
      transporte:'',
      estado:''
    });
  }

  ngOnInit(): void {
    this.getViajes();
  }

  // obtener los viajes solicitados
  getViajes(){
    this.solicitudes = []
    this.api.getCollabId(this.api.user.id).subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
    });
  }

  mostrarDiv(value:any){
    if(this.isClosed){
      this.isClosed = false;
    }
    else{
      this.isClosed = true;
      this.rid=value.id
    
      for (let i = 0; i < this.solicitudes.length; i++) {
        if (this.solicitudes[i].id == value.id) {
          console.log("buenassss");
          
          this.registerForm.destino = this.solicitudes[i].destino;
          this.registerForm.tipo = this.solicitudes[i].tipo;
          this.registerForm.motivo = this.solicitudes[i].motivo;
          this.registerForm.inicio = this.solicitudes[i].inicio;
          this.registerForm.final = this.solicitudes[i].final;
          this.registerForm.aerolinea = this.solicitudes[i].aerolinea;
          this.registerForm.precio = this.solicitudes[i].precio;
          this.registerForm.alojamiento = this.solicitudes[i].alojamiento;
          this.registerForm.transporte = this.solicitudes[i].transporte;
          this.registerForm.estado = this.solicitudes[i].estado;
          break;
        }      
      }
    }
  }

  onSubmit(invData:any){
    let tempData:any = {
      id: this.api.user.id,
      tipo: invData.tipo,
      destino:invData.destino,
      motivo:invData.motivo,
      inicio:invData.inicio,
      final:invData.final,
      aerolinea:invData.aerolinea,
      precio:invData.precio,
      alojamiento:invData.alojamiento,
      transporte:invData.transporte,
      estado: this.registerForm.estado
    }
    
    
    for (let key in tempData) {
      if (tempData.hasOwnProperty(key)) {
        const value = tempData[key];
        console.log(`Propiedad: ${key}, Valor: ${value}`);
        if (value == '') {
          tempData[key] = this.registerForm[key];
        }
      }
    }
    console.log(tempData);

    if (this.rid != '') {
      this.api.putSolicitud(this.api.user.id, this.rid, tempData).subscribe(
        response => {
          // Maneja la respuesta del servidor aquí
          console.log('Respuesta del servidor:', response);
        },
        error => {
          // Maneja los errores aquí
          console.error('Error en la solicitud POST:', error);
        }
      );
    }
    else{
      console.log("id de solicitud no encontrado");
      
    }

    
    const formulario = document.getElementById("miFormulario") as HTMLFormElement;
    formulario.reset();
    this.getViajes();
  }

  eliminar(data:any){
    this.api.deleteSolicitud(this.api.user.id, data.id).subscribe(
      response => {
        // Maneja la respuesta del servidor aquí
        console.log('Respuesta del servidor:', response);
      },
      error => {
        // Maneja los errores aquí
        console.error('Error en la solicitud POST:', error);
      }
    );
  }

}
