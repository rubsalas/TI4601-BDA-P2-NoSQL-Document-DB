import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit{
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;
  container!: HTMLElement;
  isClosed = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateBtn = this.el.nativeElement.querySelector('#mostrarBtn');
    this.deleteBtn = this.el.nativeElement.querySelector('#ocultarBtn');
    this.container = this.el.nativeElement.querySelector('#miDiv');
  }

  mostrarDiv(){
    if(this.isClosed){
      this.isClosed = false;
    }
    else{
      this.isClosed = true;
    }
  }

  eliminar(){
    // funcion para eliminar el viaje
  }

}
