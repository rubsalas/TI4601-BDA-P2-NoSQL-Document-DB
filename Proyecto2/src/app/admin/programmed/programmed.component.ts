import { Component } from '@angular/core';

@Component({
  selector: 'app-programmed',
  templateUrl: './programmed.component.html',
  styleUrls: ['./programmed.component.css']
})
export class ProgrammedComponent {
  // Variables para almacenar el mes y el año seleccionados
  selectedMonth: string = '';
  selectedYear: string = '';

  // Función para buscar viajes programados
  buscarViajes() {
    // Aquí debes implementar la lógica para buscar y mostrar la lista de colaboradores con viajes programados
    // Utiliza los valores de this.selectedMonth y this.selectedYear para realizar la búsqueda
  }
}
