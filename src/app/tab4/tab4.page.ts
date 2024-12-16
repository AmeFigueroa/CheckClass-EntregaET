import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{

  usuario: Users | null = null;

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit():void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    const correo = sessionStorage.getItem('correo');
    if (correo){
      this.authservice.getUserByEmail(correo).subscribe(users =>{
        this.usuario = users[0];
      });
    }
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil'])
  }
  
  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

}

