import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // VARIABLES
  public user: any = {
    id: '',
    nombre: "",
    correo: "",
    contra: "",
    puesto: "",
    depa: ""
  };

  public loggedCollab = false;
  public loggedAdmin = false;
  readonly APIUrl: string ='https://bda-p2-api.azurewebsites.net';

  constructor(private http: HttpClient) { }

  //------------------------------------------------------------------------>
  //         Funciones opara get, post y put en la base de datos
  //------------------------------------------------------------------------>
  
  // registrar usuario 
  addCollab(form:any):Observable<any>{
    let direccion = this.APIUrl+'/api/Collaborator';
    console.log(form);
    console.log(direccion)
    return this.http.post<any>(direccion, form);
  }
  // get usuarios registrados
  getCollab():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/api/Collaborator');
  }
  // get colaborador por id
  getCollabId(id:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/api/Collaborator/'+`${id}`+'/Request');
  }

  // add solicitud
  addSolicitud(id: any, nuevoData: any): Observable<any> {
    const url = `${this.APIUrl}/api/Collaborator/${id}/Request`;
    return this.http.post(url, nuevoData);
  }
  // put solicitud
  putSolicitud(id: any, rid:any, nuevoData: any): Observable<any> {
    const url = `${this.APIUrl}/api/Collaborator/${id}/Request/${rid}`;
    return this.http.put(url, nuevoData);
  }

  deleteSolicitud(id: any, rid:any): Observable<any> {
    // Realiza una solicitud DELETE a la URL de la API con el ID del recurso a eliminar
    return this.http.delete<any>(this.APIUrl+'/api/Collaborator/'+`${id}`+'/Request'+`${rid}`);
  }
  

  // get usuarios registrados
  getAdmin():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/api/Administrator');
  }

  // registrar usuario 
  addAdmin(form:any):Observable<any>{
    let direccion = this.APIUrl+'/api/Administrator';
    console.log(form);
    console.log(direccion)
    return this.http.post<any>(direccion, form);
  }

  //---------------------------------->
  //      Para autenticacion
  //---------------------------------->
  setLoggedCollab(valor:any){
    this.loggedCollab = valor;
  }
  setLoggedAdmin(valor:any){
    this.loggedAdmin = valor;
  }
  setUsr(valor:any){
    this.user = valor;  
  }

  getUsr(){
    return this.user;
  }

  getLoggedCollab(){
    return this.loggedCollab;
  }
  getLoggedAdmin(){
    return this.loggedAdmin;
  }
}