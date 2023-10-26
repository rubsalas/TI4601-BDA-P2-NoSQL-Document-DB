import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  constructor(private service:ApiService) { }

  InvestigatorList : any = []; // para guardar los datos que se obtienen de la peticion a la base de datos

  ngOnInit(): void {
    this.refreshInvestigatorList();
  }

  // metodo para obtener los datos de la base de datos
  refreshInvestigatorList(){

  }
}
