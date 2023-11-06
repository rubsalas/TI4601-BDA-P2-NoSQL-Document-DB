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
  soli: any = [];

  /** Se acepta la solicitud */
  aceptarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Aceptado';// en lugar de hacer esto,
    // hacer un put a la base de datos con el id de solicitud y el estado aceptado

    // refrescar lista luego de hacer el put
    this.refreshList();
  }
  /** Se rechaza la solicitud */
  rechazarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Rechazado';// en lugar de hacer esto,
    // hacer un put a la base de datos con el id de solicitud y el estado rechazado

    // refrescar lista luego de hacer el put
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
          console.log(temp);
          
          // si el estado es Pendiente
          if (this.solicitudes[i].solicitudes[j].estado == "Pendiente") {
            this.soli.push(temp)
          }      
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