import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // VARIABLES
  private loggedCollab = false;
  private loggedAdmin = false;
  readonly APIUrl: string ='https://bdap1.azurewebsites.net';

  constructor(private http: HttpClient) { }

  //------------------------------------------------------------------------>
  // Funciones opara get, post y put en la base de datos
  //------------------------------------------------------------------------>
  addUsr(form:any):Observable<any>{
    let direccion = this.APIUrl+'/api/Investigator/Mult';
    console.log(form);
    console.log(direccion)
    return this.http.post<any>(direccion, form);
  }
  getUsers():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/api/Publication/Relationship');
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
  getLoggedCollab(){
    return this.loggedCollab;
  }
  getLoggedAdmin(){
    return this.loggedAdmin;
  }
}



/**  funcion para actualizar datos
 
  putInvestigator(id: number, nuevoData: any): Observable<any> {
    const url = `${this.APIUrl}/api/Investigator/${id}`;
    return this.http.put(url, nuevoData);
  }

*/