import { Component, OnInit } from '@angular/core';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  usuario: Users | undefined;
  editedUsuario: Partial<Users> = {};
  editarperfilForm! : FormGroup;

  constructor(private authService: AuthService, 
              private router: Router,
              private alert: AlertController) {}

  ngOnInit() {
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.authService.getUserByEmail(correo).subscribe((data) => {
        this.usuario = data[0]; 
        this.editedUsuario = { ...this.usuario }; 
      });
    }
    
  }

  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editedUsuario.fotoPerfil = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.guardarCambios();
    }
  }

  guardarCambios(){
    if (this.usuario) {
      this.authService.actualizarUsuario({ ...this.usuario, ...this.editedUsuario }).subscribe(async () => {
      });
      this.enviarCambios();
      this.router.navigate(['tabs/tab3']);
    }
  }

  async enviarCambios() {
     const alert = await this.alert.create({
          header: 'Perfil actualizado',
          message: 'Su perfil se ha actualizado correctamente.',
          buttons: [{
            text: 'OK',
            handler: () => {
              window.location.reload();
            }
          }]
        });
      await alert.present();
  }

  volver(){
    this.router.navigate(['/tabs/tab3']);
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }


}
