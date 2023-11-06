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
      this.programados = []
      this.filtrodesolicitudes(this.soli, parseInt(Value.mes), parseInt(Value.anno));
    }
  }

  refreshList(){
    // hacer el get de usuarios ----->
    this.solicitudes =[]
    this.soli =[]
    this.api.getCollab().subscribe(data=>{
      this.solicitudes = data; // con esto tengo todos los usuarios 
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
          
          this.annos.push(this.obtenerAno(temp.inicio))
          
          this.soli.push(temp)     
        }
      }
      this.annos = this.eliminarRepetidos(this.annos)
      console.log(this.annos);
      
    }); 
  }

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
