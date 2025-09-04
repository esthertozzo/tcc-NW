import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaPlanosPage } from './tela-planos.page';

describe('TelaPlanosPage', () => {
  let component: TelaPlanosPage;
  let fixture: ComponentFixture<TelaPlanosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPlanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
