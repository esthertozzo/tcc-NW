import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaCadastroPage } from './tela-cadastro.page';

describe('TelaCadastroPage', () => {
  let component: TelaCadastroPage;
  let fixture: ComponentFixture<TelaCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
