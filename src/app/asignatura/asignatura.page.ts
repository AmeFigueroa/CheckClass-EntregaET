import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { QRgenerado } from '../../interfaces/qrgenerado';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  asignaturas: any;
  nombreAsignatura: string = '';
  fecha: string = '';
  nombreProfesor: string = '';
  correo: string | null = '';
  rut: string | null = '';
  qrdata: string = '';

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private alert: AlertController,
    private authService: AuthService
  ) {
    this.activated.queryParams.subscribe((params) => {
      if (params['asignatura']) {
        this.asignaturas = JSON.parse(params['asignatura']);
        this.nombreAsignatura = this.asignaturas.nombreAsignatura;
        this.fecha = this.asignaturas.fecha;
        this.nombreProfesor = this.asignaturas.nombreProfesor;
      }
    });

    this.rut = sessionStorage.getItem('rut');
    this.correo = sessionStorage.getItem('correo');
  }

  ngOnInit() {}

  generarQR() {
    if (
      this.nombreAsignatura &&
      this.fecha &&
      this.nombreProfesor &&
      this.rut &&
      this.correo
    ) {
      this.qrdata = `${this.nombreAsignatura}, ${this.fecha}, ${this.nombreProfesor}, ${this.rut.slice(
        0,
        8
      )}, ${this.correo}`;
      console.log('QR generado:', this.qrdata);

      this.registrarQR();
    } else {
      console.error('Faltan datos para generar el QR');
    }
  }

  registrarQR() {
    if (!this.rut) {
      console.error('RUT no disponible.');
      return;
    }

    const nuevoQR: QRgenerado = {
      nombreAsignatura: this.nombreAsignatura,
      nombreProfesor: this.nombreProfesor,
      fecha: this.fecha,
      seccion: this.asignaturas.seccion || 'N/A',
    };

    // Obtener el usuario por RUT
    this.authService.getUserByRut(this.rut).subscribe({
      next: (usuarios) => {
        if (usuarios.length > 0) {
          const usuario = usuarios[0]; 
          if (!usuario.qrgenerado) {
            usuario.qrgenerado = [];
          }

          usuario.qrgenerado.push(nuevoQR);

          this.authService.actualizarUsuario(usuario).subscribe({
            next: (response) =>
              console.log('QR registrado exitosamente:', response),
            error: (err) =>
              console.error('Error al actualizar el usuario:', err),
          });
        } else {
          console.error('Usuario no encontrado.');
        }
      },
      error: (err) => console.error('Error al obtener usuario por RUT:', err),
    });
  }

  async registrarAsistencia() {
    const alert = await this.alert.create({
      header: 'Asistencia registrada',
      message: 'La asistencia ha sido registrada correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });
    await alert.present();
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']);
  }

  volver() {
    this.router.navigate(['/tabs/tab2']);
    this.registrarAsistencia();
  }
}
