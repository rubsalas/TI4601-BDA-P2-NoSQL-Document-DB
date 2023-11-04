import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  constructor(private api:ApiService) { }

  solicitudes: any = []; // para guardar los datos que se obtienen de la peticion a la base de datos
  realizadas: any = [];

  ngOnInit(): void {
    this.refreshSolicitudList();
  }

  // metodo para obtener los datos de la base de datos
  refreshSolicitudList(){
    // get de todas las peticiones
    this.api.getSolicitudes().subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
      // filtrar peticiones por nombre de usuario loggeado
      for (let i = 0; i < this.solicitudes.length; i++) {
        // guardarlas en la lista solicitudes
        if(this.solicitudes[i] == this.api.user.name){
          this.realizadas.push(this.solicitudes[i])
        }        
      }
    });
  }
}
