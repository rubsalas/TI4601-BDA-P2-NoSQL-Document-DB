import { Component } from '@angular/core';

@Component({
  selector: 'app-viajes-internacionales',
  templateUrl: './viajes-internacionales.component.html',
  styleUrls: ['./viajes-internacionales.component.css']
})
export class ViajesInternacionalesComponent {
  // Propiedades para almacenar el trimestre y el año seleccionados
  selectedTrimestre: string = '';
  selectedAno: string = '';

  // Propiedad para almacenar la lista de colaboradores con viajes internacionales (simulado)
  colaboradoresConViajes: any[] = [
    { nombre: 'Colaborador 1', destino: 'País 1', fechaInicio: '2023-01-15' },
    { nombre: 'Colaborador 2', destino: 'País 2', fechaInicio: '2023-02-20' },
    // Agrega más colaboradores y viajes internacionales según tu caso
  ];

  // Función para buscar colaboradores con viajes internacionales
  buscarViajes() {
    // Implementa la lógica para buscar y mostrar la lista de colaboradores con viajes internacionales
    // Utiliza los valores de this.selectedTrimestre y this.selectedAno para realizar la búsqueda
  }
}
