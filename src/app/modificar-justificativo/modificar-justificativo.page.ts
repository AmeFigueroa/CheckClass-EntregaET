import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '../../interfaces/users';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-justificativo',
  templateUrl: './modificar-justificativo.page.html',
  styleUrls: ['./modificar-justificativo.page.scss'],
})
export class ModificarJustificativoPage implements OnInit {
  
  usuario: Users | undefined;
  editedJustificativo: any = {}; 
  justificativoIndex: number | null = null; 

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private auth: AuthService,
    private alert: AlertController) { }

  ngOnInit() { 
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.auth.getUserByEmail(correo).subscribe((data) => {
        this.usuario = data[0];

        this.justificativoIndex = +this.activated.snapshot.paramMap.get('index')!;

        if (this.usuario && this.usuario.justificativos && this.justificativoIndex !== null) {
          this.editedJustificativo = { ...this.usuario.justificativos[this.justificativoIndex] };
        }
      });
    }
  }

  cambiarFotoJustificativo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editedJustificativo.imagenJust = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambiosJustificativo() {
    if (this.usuario && this.usuario.justificativos && this.justificativoIndex !== null && this.justificativoIndex >= 0) {

      this.usuario.justificativos[this.justificativoIndex] = this.editedJustificativo;
  
      this.auth.actualizarUsuario(this.usuario).subscribe(() => {
        this.router.navigate(['/tabs/tab1']);
        this.enviarJustificacion();
      });
    }
  }

  async enviarJustificacion() {
    const alert = await this.alert.create({
      header: 'Justificativo modificado',
      message: 'Su justificativo se ha modificado correctamente.',
      buttons: [{
        text:'OK',
        handler:()=>{
          window.location.reload();
        }
      }]
    });
    await alert.present();
  }
  

  volver() {
    this.router.navigate(['tabs/tab1']);
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }
}
