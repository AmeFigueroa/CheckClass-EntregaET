import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from '../interfaces/users';

export function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    return email && !email.endsWith(domain) ? { domain: true } : null;
  };
}

export function passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
  const password = group.get('contrasena')?.value;
  const confirmPassword = group.get('confirmarContrasena')?.value;
  return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit { 

  registroForm: FormGroup;

  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off-outline'; 

  passwordType2: string = 'password';
  passwordIcon2: string = 'eye-off-outline'; 

  nuevoUsuario: UserNuevo ={
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    rut: "",
    fotoPerfil: ""
  }

  userdata: any;

  constructor(
    private authservice: AuthService,
    private alertcontroller: AlertController,
    private router: Router,
    private fbuilder: FormBuilder
  )
  {
    this.registroForm = this.fbuilder.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl ("", [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')]),
      'confirmarContrasena': new FormControl("", [Validators.required]),
      'nombre': new FormControl ("", [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl ("", [Validators.required, Validators.minLength(3)]),
      'rut': new FormControl ("", [Validators.required, Validators.pattern('^\\d{7,8}-[0-9kK]$')])
    }, { validators: passwordMatchValidator });
  }

  ngOnInit() {
    const ingresado = sessionStorage.getItem('ingresado');
    if (ingresado === 'true'){
      this.Advertencia();
      this.router.navigateByUrl('/tabs/tab3');
    }
  }

  passwordVisibility1(): void {
    if (this.passwordType1 === 'password') {
      this.passwordType1 = 'text';  
      this.passwordIcon1 = 'eye-outline';  
    } else {
      this.passwordType1 = 'password';  
      this.passwordIcon1 = 'eye-off-outline';  
    }
  }

  passwordVisibility2(): void {
    if (this.passwordType2 === 'password') {
      this.passwordType2 = 'text';  
      this.passwordIcon2 = 'eye-outline';  
    } else {
      this.passwordType2 = 'password';  
      this.passwordIcon2 = 'eye-off-outline';  
    }
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.getUserByEmail(this.registroForm.value.correo).subscribe(resp=>{
        this.userdata = resp;
        if (this.userdata.length>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.correo = this.registroForm.value.correo;
          this.nuevoUsuario.contrasena = this.registroForm.value.contrasena;
          this.nuevoUsuario.nombre = this.registroForm.value.nombre;
          this.nuevoUsuario.apellido = this.registroForm.value.apellido;
          this.nuevoUsuario.rut = this.registroForm.value.rut;
          this.nuevoUsuario.fotoPerfil = "assets/img/user.jpg";

          this.authservice.postUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/comienzo');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario registrado',
      message: 'Bienvenid@ ' + this.nuevoUsuario.nombre,
      buttons: ['Aceptar']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error...',
      message: 'Estimad@ ' + this.nuevoUsuario.nombre + ' ya se encuentra registrado.',
      buttons: ['Aceptar']
    });
    alerta.present();
  }

  pageinicio(){
    this.router.navigateByUrl('/comienzo');
  }

  async Advertencia() {
    const alerta = await this.alertcontroller.create({
      header: 'Registro anulado',
      message: 'Ya has iniciado sesión previamente, no puedes crear una nueva cuenta.',
      buttons: ['Aceptar']
    });
    alerta.present();
  }
}
