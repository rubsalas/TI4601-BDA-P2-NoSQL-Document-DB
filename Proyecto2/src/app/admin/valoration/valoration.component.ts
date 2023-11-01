import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

// Define la interfaz Solicitud directamente en este archivo
interface Solicitud {
  id: number;
  nombre: string;
  motivo: string;
  estado: string;
  destino: string;
  puesto: string;
  departamento: string;
  tipo: string;
  inicio: string;
  fin: string;
  aerolinea: string;
  transporte: string;
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

  /** Se acepta la solicitud */
  aceptarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Aceptado';// en lugar de hacer esto,
    // hacer un put a la base de datos con el id de solicitud y el estado aceptado

    // refrescar lista luego de hacer el put
  }
  /** Se rechaza la solicitud */
  rechazarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Rechazado';// en lugar de hacer esto,
    // hacer un put a la base de datos con el id de solicitud y el estado rechazado

    // refrescar lista luego de hacer el put
  }

  refreshList(){
    // hacer el get de las solicitudes
    // escoger las solicitudes que tengan estado pendiente y agregarlas a la lista this.solicitudes
  }
}



// cada vez que se acepte o rechace una solicitud, eliminar de la lista
/** 
 * Esto se puede hacer con un postpara cambiar el estado de la solicitud,
 * una vez que se haga el put, volver a hacer get de solicitudes y actualizar la lista.
 */