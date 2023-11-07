import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-programmed',
  templateUrl: './programmed.component.html',
  styleUrls: ['./programmed.component.css']
})
export class ProgrammedComponent {
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;
  solicitudes: any = [];
  meses: any = [
    {mes:"Enero", num:"01"},{mes:"Febrero", num:2},{mes:"Marzo", num:3},{mes:"Abril", num:4},{mes:"Mayo", num:5},
    {mes:"Junio", num:6},{mes:"Julio", num:7},{mes:"Agosto", num:8},{mes:"Setiembre", num:9},
    {mes:"Octubre", num:10},{mes:"Noviembre", num:11},{mes:"Diciembre", num:12},];
  annos: any = [];
  soli: any = [];
  temp:any = [];

  programados:any = []
  timeForm:any;


  constructor(private el: ElementRef, private api:ApiService, private formBuilder:FormBuilder) {
    this.timeForm = this.formBuilder.group({
      mes: '',
      anno:""
    });
  }

  ngOnInit(): void {
    this.updateBtn = this.el.nativeElement.querySelector('#mostrarBtn');
    this.deleteBtn = this.el.nativeElement.querySelector('#ocultarBtn');
    this.container = this.el.nativeElement.querySelector('#miDiv');
    this.refreshList();
  }

  mostrarDiv(Value:any){

    if(this.isClosed){
      this.isClosed = false;
      this.refreshList();
    }
    else{
      this.isClosed = true;
      this.programados = [];
      this.filtrodesolicitudes(this.soli, parseInt(Value.mes), parseInt(Value.anno));
    }
  }

  refreshList(){
      // hacer el get de usuarios ----->
      this.solicitudes =[];
      this.programados = [];
      this.soli =[];
      this.api.getRequests().subscribe(data=>{
        this.solicitudes = data; // con esto tengo todos los usuarios 
        console.log(this.solicitudes);
        for (let i = 0; i < this.solicitudes.length; i++) {
          if (this.solicitudes[i].estado == "Aceptado") {
            this.soli.push(this.solicitudes[i]);
            this.temp.push(this.obtenerAno(this.solicitudes[i].inicio))
          }        
        }
        this.annos = this.eliminarRepetidos(this.temp)
        console.log(this.programados);
        console.log(this.annos);
        
      }); 
  }
  //
  eliminarRepetidos(lista: number[]): number[] {
    return lista.filter((numero, index, arr) => arr.indexOf(numero) === index);
  }

  filtrodesolicitudes(solicitudes: any[], mes: number, ano: number){
    for (let i = 0; i < solicitudes.length; i++) {
      //obtener trimestre de soli.inicio
      let month = this.obtenerMes(solicitudes[i].inicio)
      //obtener anno de soli.inicio
      let anio = this.obtenerAno(solicitudes[i].inicio)      
      // si los dos anteriores match trimestre y ano y tipo es internacional, guardarlos en lista
      if (month == mes && anio == ano) {
        this.programados.push(solicitudes[i]);
      }
    }
    
  }

  obtenerMes(fecha: string): number {
    const partes = fecha.split('/');
    if (partes.length === 3) {
      const mes = parseInt(partes[1], 10); // Obtiene el mes como número
      if (mes >= 1 && mes <= 12) {
        return mes;
      }
    }
    return 1; // Valor predeterminado o indicador de que la fecha no es válida
  }
  
  obtenerAno(fecha: string): number {
    const partes = fecha.split('/');
    if (partes.length === 3) {
      const ano = parseInt(partes[2], 10); // Obtén la parte del año y conviértela a un número
      if (!isNaN(ano)) {
        return ano;
      }
    }
    return 2020; // Valor predeterminado o indicador de que no se pudo obtener el año
  }

}
