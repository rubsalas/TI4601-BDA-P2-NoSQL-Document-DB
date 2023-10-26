import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // VARIABLES
  private shared = false;
  private userData = null;
  readonly APIUrl: string ='https://bdap1.azurewebsites.net';

  constructor(private http: HttpClient) { }

  /////////------------------------------------------------------------------------
  ///////// Para los colaboradores
  /////////------------------------------------------------------------------------
  addInvFile(form:any):Observable<any>{
    let direccion = this.APIUrl+'/api/Investigator/Mult';
    console.log(form);
    console.log(direccion)
    return this.http.post<any>(direccion, form);
  }
  getLinksPP():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/api/Publication/Relationship');
  }
  putInvestigator(id: number, nuevoData: any): Observable<any> {
    const url = `${this.APIUrl}/api/Investigator/${id}`;
    return this.http.put(url, nuevoData);
  }
}
