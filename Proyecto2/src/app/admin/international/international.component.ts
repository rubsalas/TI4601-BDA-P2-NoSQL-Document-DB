import { Component, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent {
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;
  solicitudes: any = [];
  soli:any=[]
  trimestres: any = [
    {trim:"Trimestre 1"},{trim:"Trimestre 2"},{trim:"Trimestre 3"},{trim:"Trimestre 4"}];
  annos: any = [];
  internacionales:any = []
  timeForm:any;

  constructor(private el: ElementRef, private api:ApiService, private formBuilder:FormBuilder) {
    this.timeForm = this.formBuilder.group({
      trimestre: '',
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
      this.internacionales = []
      let num = 0;
      if (Value.trimestre == "Trimestre 1") {
        num = 1;
      }
      else if (Value.trimestre == "Trimestre 2") {
        num = 2;
      }
      else if (Value.trimestre == "Trimestre 3") {
        num = 3;
      }else{
        num = 4;
      }
      this.filtrodesolicitudes(this.soli, num, parseInt(Value.anno));
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
    }); 
  }

  eliminarRepetidos(lista: number[]): number[] {
    return lista.filter((numero, index, arr) => arr.indexOf(numero) === index);
  }

  filtrarSolicitudesPorTrimestreYAno(solicitudes: any[], trimestre: number, ano: number): any[] {
    return solicitudes.filter((solicitud) => {
      // Parsea la fecha de inicio (suponiendo que está en formato 'dd/mm/aaaa')
      const fechaInicio = new Date(solicitud.inicio);
      const solicitudTrimestre = Math.floor((fechaInicio.getMonth() + 3) / 3); // Calcula el trimestre
  
      return solicitudTrimestre === trimestre && fechaInicio.getFullYear() === ano;
    });
  }

  filtrodesolicitudes(solicitudes: any[], trimestre: number, ano: number){
    for (let i = 0; i < solicitudes.length; i++) {
      //obtener trimestre de soli.inicio
      let trime = this.obtenerTrimestre(solicitudes[i].inicio)
      
      //obtener anno de soli.inicio
      let anio = this.obtenerAno(solicitudes[i].inicio)
      
      // si los dos anteriores match trimestre y ano y tipo es internacional, guardarlos en lista
      if (trime == trimestre && anio == ano && solicitudes[i].tipo == "Internacional") {
        this.internacionales.push(solicitudes[i]);
      }
    }
    
  }

  obtenerTrimestre(fecha: string): number {
    const partes = fecha.split('/');
    if (partes.length !== 3) {
      return 0; // Verifica que la fecha tenga el formato adecuado
    }
  
    const mes = parseInt(partes[1], 10); // Obtiene el mes como número
  
    if (mes < 1 || mes > 12) {
      return 0; // Verifica que el mes sea válido
    }
  
    // Determina el trimestre en función del mes
    let trimestre = 0;
    if (mes >= 1 && mes <= 3) {
      trimestre = 1;
    } else if (mes >= 4 && mes <= 6) {
      trimestre = 2;
    } else if (mes >= 7 && mes <= 9) {
      trimestre = 3;
    } else {
      trimestre = 4;
    }
  
    return trimestre;
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
