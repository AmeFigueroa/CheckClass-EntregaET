import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturaPageRoutingModule } from './asignatura-routing.module';

import { AsignaturaPage } from './asignatura.page';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    ReactiveFormsModule,
    AsignaturaPageRoutingModule
  ],
  declarations: [AsignaturaPage]
})
export class AsignaturaPageModule {}
