import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarJustificativoPage } from './modificar-justificativo.page';

describe('ModificarJustificativoPage', () => {
  let component: ModificarJustificativoPage;
  let fixture: ComponentFixture<ModificarJustificativoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarJustificativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
