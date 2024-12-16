import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  datousuario: any;

  usuario= {
      id: 0,
      correo: "",
      contrasena: "",
      nombre: "",
      apellido: "",
      rut: "",
      carrera: '',
      fotoPerfil: '',
      asignaturas: [],
      justificativos: [],
      qrgenerado: [],

  }

  passwordForm: FormGroup;

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    private auth: AuthService,
    private alert: AlertController
  )
  {
    this.passwordForm = this.fbuilder.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  }

  confirmarPass(){
    this.router.navigate(['comienzo']);
  }

verificarEmail() {
  if (this.passwordForm.valid) {
    const correo = this.passwordForm.value.correo.trim().toLowerCase(); 
    this.auth.getUserByEmail(correo).subscribe((resp) => {
      this.datousuario = resp;
      console.log(this.datousuario);
      if (this.datousuario.length > 0) {
        this.usuario = {
          id: this.datousuario[0].id,
          correo: this.datousuario[0].correo,
          contrasena: this.datousuario[0].contrasena,
          nombre: this.datousuario[0].nombre,
          apellido: this.datousuario[0].apellido,
          rut: this.datousuario[0].rut,
          carrera: this.datousuario[0].carrera,
          fotoPerfil: this.datousuario[0].fotoPerfil,
          asignaturas: this.datousuario[0].asignaturas,
          justificativos: this.datousuario[0].justificativos,
          qrgenerado: this.datousuario[0].qrgenerado,
        };
        this.router.navigate(['/new-password', this.usuario.id]);
      } else {
        this.noExiste();
        this.passwordForm.reset();
      }
    });
  }
}


  async noExiste() {
    const alerta = await this.alert.create({
      header: "No existe",
      message: "No hay correo vinculado",
      buttons: ["OK"],
    });
    alerta.present();
  }

  volver(){
    this.router.navigate(['/comienzo'])
  }

}
