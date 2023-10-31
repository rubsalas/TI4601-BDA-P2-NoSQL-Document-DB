import { Component } from '@angular/core';

// Define la interfaz Solicitud directamente en este archivo
interface Solicitud {
  id: number;
  nombre: string;
  motivo: string;
  estado: string;
}


@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesComponent {
  solicitudes: Solicitud[] = [
    { id: 1, nombre: 'Juan Perez', motivo: 'paseo', estado: 'Pendiente' },
    { id: 2, nombre: 'Maria Fonseca', motivo: 'medico', estado: 'Pendiente' },
    // Agrega más solicitudes según tus necesidades
  ];

  aceptarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Aceptado';
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 'Rechazado';
  }
}


