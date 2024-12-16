import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarJustificativoPageRoutingModule } from './modificar-justificativo-routing.module';

import { ModificarJustificativoPage } from './modificar-justificativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarJustificativoPageRoutingModule
  ],
  declarations: [ModificarJustificativoPage]
})
export class ModificarJustificativoPageModule {}
