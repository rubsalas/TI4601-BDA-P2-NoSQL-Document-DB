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
  filtradas: any =[];
  temp:any = [];
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
      for (let i = 0; i < this.solicitudes.length; i++) {
        if (this.solicitudes[i].destino == Value.destino) {
          this.selected.push(this.solicitudes[i])
        }
      }
    }
  }

  refreshList(){
    this.solicitudes =[];
    this.api.getRequests().subscribe(data=>{
      this.solicitudes = data;
      this.temp = this.filtrodesolicitudes(this.solicitudes);
      console.log(this.temp);
      
      this.filtradas = this.compararPorNombre(this.temp)
      console.log(this.filtradas);
      
    });
  }

  filtrodesolicitudes(lista: any) {
    // Usamos un conjunto (Set) para almacenar nombres únicos.
    const nombresUnicosSet = new Set<string>();
  
    // Iteramos a través de la lista de nombres y los agregamos al conjunto.
    for (let i = 0; i < lista.length; i++) {
      nombresUnicosSet.add(lista[i].destino);
      
    }
    // Convertimos el conjunto de nuevo a un array para devolver la lista de nombres únicos.
    const nombresUnicos = Array.from(nombresUnicosSet);
  
    return nombresUnicos;
  }

  // Función de comparación personalizada para ordenar por el campo "nombre"
compararPorNombre(lista: string[]): string[] {
  // Usamos el método `sort()` para ordenar la lista alfabéticamente.
  return lista.sort();
}
}
