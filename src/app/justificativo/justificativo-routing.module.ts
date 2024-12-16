import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificativoPage } from './justificativo.page';

const routes: Routes = [
  {
    path: '',
    component: JustificativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificativoPageRoutingModule {}
