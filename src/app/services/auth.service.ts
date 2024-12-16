import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, UserNuevo } from '../interfaces/users';
import { environment } from '../../environments/environment';
import { UserEstudiante } from '../interfaces/usersestudiantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpclient: HttpClient
  ) { }

  // OBTENER TODOS LOS USUARIOS
  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/datos_docente`);
  }

  getDocenteById(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/datos_docente/${id}`);
  }

  // OBTENER USUARIO MEDIANTE EMAIL
  getUserByEmail(usuario: any): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/datos_docente/?correo=${usuario}`);
  }

  // VALIDAR SI EL USUARIO ESTA LOGEADO
  IsLoggedIn() {
    return sessionStorage.getItem('correo') != null;
  }

  // ACTUALIZAR DATOS
  actualizarUsuario(usuarios: any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/datos_docente/${usuarios.id}`, usuarios);
  }

  // REGISTRAR USUARIO
  postUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<Users>(`${environment.apiUrl}/datos_docente`, newUsuario);
  }

  //RECIBIR ESTUDIANTE JUSTIFICATIVO
  getAllStudents(): Observable<UserEstudiante[]> {
    return this.httpclient.get<UserEstudiante[]>(`${environment.apiUrlEst}/usuarios`);
  }

  actualizarAlumno(usuario: any): Observable<UserEstudiante> {
    return this.httpclient.put<UserEstudiante>(`${environment.apiUrlEst}/usuarios/${usuario.id}`, usuario);
  }

  getEstudianteById(id: number): Observable<UserEstudiante> {
    return this.httpclient.get<UserEstudiante>(`${environment.apiUrlEst}/usuarios/${id}`);
  }


}
