import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.page.html',
  styleUrls: ['./respuesta.page.scss'],
})
export class RespuestaPage implements OnInit {
  justificativo: any = {}; 
  respuesta: string = ''; 

  respuestaForm!: FormGroup;

  estudiantes: any[] = [];

  constructor(
    private acti: ActivatedRoute,
    private router: Router,
    private Fbuild: FormBuilder,
    private auth: AuthService,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
    this.acti.queryParams.subscribe((params) => {
      if (params['post']) {
        try {
          this.justificativo = JSON.parse(params['post']);
          console.log('Datos del justificativo:', this.justificativo);

          this.respuestaForm = this.Fbuild.group({
            respuesta: [this.justificativo.respuesta || '', Validators.required]
          });
        } catch (error) {
          console.error('Error al parsear los parámetros:', error);
        }
      }
    });
  }
  

  cargarEstudiantes() {
    this.auth.getAllStudents().subscribe((data) => {
      this.estudiantes = data;
    });
  }

  guardarRespuesta() {
    if (this.respuestaForm.valid) {
      const nuevaRespuesta = this.respuestaForm.value.respuesta;
      const estudiante = this.estudiantes.find((e: any) => e.id === '1'); 
  
      if (estudiante && estudiante.justificativos && estudiante.justificativos.length > 0) {
        estudiante.justificativos[0].respuesta = nuevaRespuesta;
  
        this.auth.actualizarAlumno(estudiante).subscribe(
          (response) => {
            console.log('Justificativo actualizado:', response);
            this.justificativo.respuesta = nuevaRespuesta;
          },
          (error) => {
            console.error('Error al actualizar el justificativo:', error);
          }
        );
      } else {
        console.warn('No se encontró el estudiante o el justificativo.');
      }
      this.Enviado();
    }
  }
  
  async Enviado() {
    const alerta = await this.alert.create({
      header: 'Respuesta enviada correctamente',
      buttons: [{
        text: 'OK'
      }]
    });
    alerta.present();
  }
  
  
  volver() {
    this.router.navigate(['/tabs/tab3']);
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']);
  }


}
