import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaPerfilPage } from './tela-perfil.page';

describe('TelaPerfilPage', () => {
  let component: TelaPerfilPage;
  let fixture: ComponentFixture<TelaPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
