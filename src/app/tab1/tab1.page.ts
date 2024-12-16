import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  usuario: Users | null = null;


  constructor(
    private router: Router,
    private authservice: AuthService) {}

    ngOnInit():void{
      this.cargarUsuario();
    }

  ionViewWillEnter() {
    this.cargarUsuario(); 
  }
    
  cargarUsuario() {
    const correo = sessionStorage.getItem('correo');

    if (correo) {
      this.authservice.getUserByEmail(correo).subscribe((usuarios) => {
        this.usuario = usuarios.length > 0 ? usuarios[0] : null;
      });
    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

  crearJustificativo(){
    this.router.navigate(['/justificativo']);
  }

  modificarJustificativo(justificativo: any) {
    this.router.navigate(['/modificar-justificativo'], {
      queryParams: { justificativo: JSON.stringify(justificativo) }
    });
  }
}