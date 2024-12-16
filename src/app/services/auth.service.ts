import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from '../../interfaces/users';
import { environment } from '../../environments/environment'
import { Justificativo } from '../../interfaces/justificativo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpclient: HttpClient,
  ) { }

  getAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  getUserByEmail(usuario: any): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios/?correo=${usuario}`);
  }
  
  getUserByRut(rut: any): Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios/?rut=${rut}`);
  }

  getUserById(id:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  actualizarUsuario(usuarios: any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuarios.id}`, usuarios);
  }  
  
  isLoggedIn(){
    return sessionStorage.getItem('correo')!=null;
  }

  PostUsuario(newUsuario:UserNuevo): Observable<UserNuevo>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }  
  
}  