import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent {
  // Propiedad para almacenar las solicitudes pendientes (simulado)
  solicitudesPendientes: any[] = [
    { id: 1, colaborador: 'Nombre Colaborador 1', fechaSolicitud: '2023-10-01' },
    { id: 2, colaborador: 'Nombre Colaborador 2', fechaSolicitud: '2023-10-02' },
    // Agrega más solicitudes pendientes según tu caso
  ];

  // Función para aprobar una solicitud
  aprobarSolicitud(solicitud: any) {
    // Implementa la lógica para aprobar la solicitud
    console.log('Solicitud aprobada:', solicitud);
  }

  // Función para rechazar una solicitud
  rechazarSolicitud(solicitud: any) {
    // Implementa la lógica para rechazar la solicitud
    console.log('Solicitud rechazada:', solicitud);
  }
}

