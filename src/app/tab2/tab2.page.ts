import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  usuarios: any[] = [];
 
  ngOnInit(): void {
    this.cargarUsuario();
  }

  constructor(
    private router: Router,
    private authservice: AuthService
  ) {}

  cargarUsuario() { 
    const email = sessionStorage.getItem('correo'); 
    this.authservice.getUserByEmail(email).subscribe(resp => {
      this.usuarios = resp; 
    });
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

  navegarAsignatura(asignatura: any) {
    this.router.navigate(['/asignatura'], {
      queryParams: { asignatura: JSON.stringify(asignatura) }
    });
  }
  
}
