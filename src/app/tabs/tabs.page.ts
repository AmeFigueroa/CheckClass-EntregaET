import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router
  ) {}

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/comienzo']); 
  }

}
