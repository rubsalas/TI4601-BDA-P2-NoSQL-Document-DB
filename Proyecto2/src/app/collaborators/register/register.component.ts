import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: any;

  constructor (private api:ApiService, private formBuilder:FormBuilder){
    this.registerForm = this.formBuilder.group({
      tipo: '',
      destino:'',
      motivo:'',
      inicio:'',
      final:'',
      aerolinea:'',
      precio:'',
      alojamiento:'',
      transporte:''
    });
  }
  
  onSubmit(invData:any){
    let tempData = {
      tipo: invData.tipo,
      destino:invData.destino,
      motivo:invData.motivo,
      inicio:invData.inicio,
      final:invData.final,
      aerolinea:invData.aerolinea,
      precio:invData.precio,
      alojamiento:invData.alojamiento,
      transporte:invData.transporte,
      estado:"Pendiente"
    }
    let usuarioId = this.api.user.id;
    console.log(usuarioId);
    console.log(tempData);
    
    
    this.api.addSolicitud(usuarioId, tempData).subscribe( // si no sirve, usar stringify
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
