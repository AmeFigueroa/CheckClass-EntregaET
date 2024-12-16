import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserEstudiante } from '../interfaces/usersestudiantes';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  estudiantes: any[] = [];

  constructor(
    private router: Router ,
    private auth: AuthService 
  ) {}
  
  ngOnInit(){ 
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.auth.getAllStudents().subscribe((data) => {
      this.estudiantes = data;
    });
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

  buscarJustificativo(justificativo: any) {
    const estudiante = this.estudiantes.find(est => est.justificativos.includes(justificativo));
    this.router.navigate(['/respuesta'], {
      queryParams: {
        post: JSON.stringify({
          ...justificativo,
          nombreEstudiante: estudiante?.nombre,
          apellidoEstudiante: estudiante?.apellido
        }),
      },
    });
  }
  
  

}
