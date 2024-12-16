import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserNuevo } from '../../interfaces/users';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    return email && !email.endsWith(domain)
      ? { domain: true }
      : null;
  };
}

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('contrasena')?.value;
  const confirmPassword = control.get('confirmarContrasena')?.value;
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

  nuevoUsuario: UserNuevo = {
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    rut: ""
  }

  userdata: any;

  firstname: string = '';  

  constructor(
    private authservice: AuthService,
    private alertcontroller: AlertController,
    private router: Router,
    private fBuilder: FormBuilder
  ) 
  { 
    this.registroForm = this.fBuilder.group({
      'correo': new FormControl("", [Validators.required, Validators.email, emailDomainValidator('@duocuc.cl')]),
      'contrasena': new FormControl("", [Validators.required, Validators.minLength(8)]),
      'confirmarContrasena': new FormControl("", [Validators.required]),
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]),
      'apellido': new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]),
      'rut': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+-[0-9kK]{1}$')]) 
    }, { validators: passwordMatchValidator });
    
  }

  ngOnInit() {}

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

  crearUsuario() {
    if (this.registroForm.valid) {
      this.authservice.getUserByEmail(this.registroForm.value.correo).subscribe(resp => {
        this.userdata = resp;
        if (this.userdata.length > 0) {
          this.registroForm.reset();
          this.errorDuplicidad();
        } else {
          this.authservice.getUserByRut(this.registroForm.value.rut).subscribe(rutResp =>{
            if (rutResp.length > 0){
              this.registroForm.reset();
              this.errorDuplicidad();
            } else {
              this.nuevoUsuario.correo = this.registroForm.value.correo;
              this.nuevoUsuario.contrasena = this.registroForm.value.contrasena;
              this.nuevoUsuario.nombre = this.registroForm.value.nombre;
              this.nuevoUsuario.apellido = this.registroForm.value.apellido;
              this.nuevoUsuario.rut = this.registroForm.value.rut;
      
              this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
              this.registroForm.reset();
              this.mostrarMensaje();
              this.router.navigateByUrl('/bienvenida');
            }
          })
        }
      });
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenido! ' + this.nuevoUsuario.nombre,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted ' + this.nuevoUsuario.nombre + ' ya está registrado.',
      buttons: ['OK']
    });
    alerta.present();
  }

  pageinicio() {
    this.router.navigate(['comienzo']);
  }
}
