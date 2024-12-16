import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarJustificativoPage } from './modificar-justificativo.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarJustificativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarJustificativoPageRoutingModule {}
