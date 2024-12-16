import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificativoPageRoutingModule } from './justificativo-routing.module';

import { JustificativoPage } from './justificativo.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    JustificativoPageRoutingModule
  ],
  declarations: [JustificativoPage]
})
export class JustificativoPageModule {}
