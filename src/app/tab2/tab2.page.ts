import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    private alertcontroller: AlertController, private router: Router
  ) {}

  ngOnInit(){
    Camera.requestPermissions();
  }

  async escanearQR(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }
}
