import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestaPage } from './respuesta.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespuestaPageRoutingModule {}
