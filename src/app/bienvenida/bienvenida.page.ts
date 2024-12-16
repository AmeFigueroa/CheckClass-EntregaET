import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Swiper } from 'swiper/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  usuarios: any;

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuarios = sessionStorage.getItem('nombre');
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  iniciandoApp() {
    this.router.navigate(['tabs/tab2']);
  }

}
