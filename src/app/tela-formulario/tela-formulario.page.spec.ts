import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaFormularioPage } from './tela-formulario.page';

describe('TelaFormularioPage', () => {
  let component: TelaFormularioPage;
  let fixture: ComponentFixture<TelaFormularioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaFormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
