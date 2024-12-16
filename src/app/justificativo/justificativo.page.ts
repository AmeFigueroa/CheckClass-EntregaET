import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../../interfaces/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificativo',
  templateUrl: './justificativo.page.html',
  styleUrls: ['./justificativo.page.scss'],
})
export class JustificativoPage implements OnInit {

  usuario: Users | null = null;
  justificativoForm!: FormGroup; 

  imagenEscogida: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private authservice: AuthService,
    private Fbuild: FormBuilder,
    private alert: AlertController
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.justificativoForm = this.Fbuild.group({
      nombreAsignaturaJust: ['', Validators.required],
      seccionJust: ['', Validators.required],
      imagenJust: ['', Validators.required],
      descripcionJust: ['', Validators.required],
      nombreProfesorJust: ['', Validators.required],
      respuesta: ['']
    });
  }

  cargarUsuario() {
    const correo = sessionStorage.getItem('correo');

    if (correo) {
      this.authservice.getUserByEmail(correo).subscribe((usuarios) => {
        this.usuario = usuarios.length > 0 ? usuarios[0] : null;
      });
    }
  }

  seleccionarImgen(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenEscogida = reader.result; 
        this.justificativoForm.patchValue({ imagenJust: this.imagenEscogida }); 
      };
      reader.readAsDataURL(file);
    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

  guardarJustificativo() {
    if (this.usuario && this.justificativoForm.valid) {
      const nuevoJustificativo = this.justificativoForm.value;

      if (this.usuario.justificativos) {
        this.usuario.justificativos.push(nuevoJustificativo);
      } else {
        this.usuario.justificativos = [nuevoJustificativo];
      }

      this.authservice.actualizarUsuario(this.usuario).subscribe(() => {
        this.justificativoForm.reset();
        this.imagenEscogida = null;
      });
      this.enviarJustificacion();
      this.router.navigate(['tabs/tab1']);
    }
  }

  async enviarJustificacion() {
    const alert = await this.alert.create({
      header: 'Justificativo enviado',
      message: 'Su justificativo se ha enviado correctamente.',
      buttons: [{
        text:'OK',
        handler:()=>{
          window.location.reload();
        }
      }]
    });
    await alert.present();
    this.justificativoForm.reset();
    this.imagenEscogida = null;
  }

  volver(){
    this.router.navigate(['tabs/tab1']);
  }
}
