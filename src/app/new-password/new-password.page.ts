import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export function passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
  const password = group.get('contrasena')?.value;
  const confirmPassword = group.get('confirmarContrasena')?.value;
  return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
}

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  editarContrasenaForm!: FormGroup;
  usuario: any = {};
  contrasena: string = '';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off-outline';
  passwordType2: string = 'password';
  passwordIcon2: string = 'eye-off-outline';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertController,
    private fb: FormBuilder
  ) {
    this.editarContrasenaForm = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')]),
      confirmarContrasena: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator });
  }

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.auth.getAllUsers().subscribe((data) => {
      console.log('Usuarios cargados:', data);  
    });
  }
  
  guardarContrasena() {
    const correoIngresado = this.editarContrasenaForm.get('correo')?.value.trim().toLowerCase();
    console.log('Correo ingresado:', correoIngresado);
  
    if (this.editarContrasenaForm.valid) {
      this.auth.getAllUsers().subscribe((data) => {
        console.log('Usuarios cargados:', data);
        this.usuario = data.find((user: any) => user.correo.toLowerCase() === correoIngresado);
  
        if (this.usuario) {
          console.log('Usuario encontrado:', this.usuario);
          this.actualizarContrasena();
        } else {
          this.noActualizo();
        }
      });
    } else {
      console.warn('Formulario inválido');
      this.noActualizo();
    }
  }
  
  actualizarContrasena() {
    const nuevaContrasena = this.editarContrasenaForm.value.contrasena;
  
    if (this.usuario) {
      this.usuario.contrasena = nuevaContrasena;
  
      this.auth.actualizarUsuario(this.usuario).subscribe(
        (response) => {
          console.log('Cambio de contraseña enviado', response);
          this.enviarCambios();
        },
        (error) => {
          console.error('Error al actualizar contraseña', error);
        }
      );
    } else {
      console.warn('No se encontró al usuario. Verifique el correo ingresado.');
      this.noActualizo();
    }
  }
  

  async noActualizo() {
    const alert = await this.alert.create({
      header: 'Correo no encontrado',
      message: 'Su contraseña no se ha actualizado.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async enviarCambios() {
    const alert = await this.alert.create({
      header: 'Contraseña actualizada',
      message: 'Su contraseña se ha actualizado correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/comienzo']);
  }

  passwordVisibility1(): void {
    this.passwordType1 = this.passwordType1 === 'password' ? 'text' : 'password';
    this.passwordIcon1 = this.passwordIcon1 === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  passwordVisibility2(): void {
    this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password';
    this.passwordIcon2 = this.passwordIcon2 === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  volver() {
    this.router.navigate(['/password']);
  }
}
