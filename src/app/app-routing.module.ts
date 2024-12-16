import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guard/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'comienzo',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'comienzo',
    loadChildren: () => import('./comienzo/comienzo.module').then( m => m.ComienzoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'asignatura',
    loadChildren: () => import('./asignatura/asignatura.module').then( m => m.AsignaturaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'justificativo',
    loadChildren: () => import('./justificativo/justificativo.module').then( m => m.JustificativoPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'modificar-justificativo',
    loadChildren: () => import('./modificar-justificativo/modificar-justificativo.module').then( m => m.ModificarJustificativoPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'new-password/:id',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
