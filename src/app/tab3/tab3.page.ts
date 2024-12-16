import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../../interfaces/users';
import { QRgenerado } from '../../interfaces/qrgenerado';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  passwordType: string = 'password'; 
  usuario: Users | null = null; 
  datosQR: QRgenerado[] = []; 

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.cargarUsuario(); 
  }

  cargarUsuario() {
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.authservice.getUserByEmail(correo).subscribe({
        next: (users) => {
          if (users.length > 0) {
            this.usuario = users[0];
            this.datosQR = this.usuario.qrgenerado || [];
          } else {
            console.error('Usuario no encontrado');
            this.router.navigate(['/comienzo']);
          }
        },
        error: (err) => {
          console.error('Error al cargar el usuario:', err);
        },
      });
    }
  }

  verContrasena() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']);
  }

  editarPerfil() {
    this.router.navigate(['editar-perfil']);
  }
}
