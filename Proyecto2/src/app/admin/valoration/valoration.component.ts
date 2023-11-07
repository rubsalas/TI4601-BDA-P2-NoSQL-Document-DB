import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

// Define la interfaz Solicitud directamente en este archivo
interface Solicitud {
  cid: string,
  id:string,
  tipo: string,
  destino:string,
  motivo:string,
  inicio:string,
  final:string,
  aerolinea:string,
  precio:string,
  alojamiento:string,
  transporte:string,
  estado: string
}

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.css']
})
export class ValorationComponent implements OnInit{
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.refreshList();
  }

  solicitudes: any = [];
  soli: any = [];

  /** Se acepta la solicitud */
  aceptarSolicitud(solicitud: Solicitud): void {
    
    let tempData:any = {
      tipo: solicitud.tipo,
      destino:solicitud.destino,
      motivo:solicitud.motivo,
      inicio:solicitud.inicio,
      final:solicitud.final,
      aerolinea:solicitud.aerolinea,
      precio:solicitud.precio,
      alojamiento:solicitud.alojamiento,
      transporte:solicitud.transporte,
      estado: 'Aceptado'
    }

    // hacer un put a la base de datos con el id de solicitud y el estado aceptado
    this.api.putSolicitud(solicitud.cid, solicitud.id, tempData).subscribe(
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
  /** Se rechaza la solicitud */
  rechazarSolicitud(solicitud: Solicitud): void {
    let tempData:any = {
      tipo: solicitud.tipo,
      destino:solicitud.destino,
      motivo:solicitud.motivo,
      inicio:solicitud.inicio,
      final:solicitud.final,
      aerolinea:solicitud.aerolinea,
      precio:solicitud.precio,
      alojamiento:solicitud.alojamiento,
      transporte:solicitud.transporte,
      estado: 'Rechazado'
    }

    // hacer un put a la base de datos con el id de solicitud y el estado aceptado
    this.api.putSolicitud(solicitud.cid, solicitud.id, tempData).subscribe(
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

  refreshList(){
    // hacer el get de usuarios ----->
    this.solicitudes =[]
    this.soli =[]
    this.api.getRequests().subscribe(data=>{
      this.solicitudes = data; // con esto tengo todos los usuarios 
      console.log(this.solicitudes);
      for (let i = 0; i < this.solicitudes.length; i++) {
        if (this.solicitudes[i].estado == "Pendiente") {
          this.soli.push(this.solicitudes[i]);
        }        
      }
      console.log(this.soli);
    }); 
  }
}



// cada vez que se acepte o rechace una solicitud, eliminar de la lista
/** 
 * Esto se puede hacer con un postpara cambiar el estado de la solicitud,
 * una vez que se haga el put, volver a hacer get de solicitudes y actualizar la lista.
 */