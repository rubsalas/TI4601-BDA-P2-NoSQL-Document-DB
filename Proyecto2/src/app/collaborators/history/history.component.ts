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
  nombreUsr = '';

  ngOnInit(): void {
    this.refreshSolicitudList();
  }

  // metodo para obtener los datos de la base de datos
  refreshSolicitudList(){
    this.nombreUsr = this.api.user.nombre;
    console.log(this.api.user);
    
    // get de todas las peticiones
    this.api.getCollabId(this.api.user.id).subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
    });
  }
}
