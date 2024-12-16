import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaPage } from './respuesta.page';

describe('RespuestaPage', () => {
  let component: RespuestaPage;
  let fixture: ComponentFixture<RespuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
