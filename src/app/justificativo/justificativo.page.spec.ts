import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificativoPage } from './justificativo.page';

describe('JustificativoPage', () => {
  let component: JustificativoPage;
  let fixture: ComponentFixture<JustificativoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
