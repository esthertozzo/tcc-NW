import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaPostPage } from './tela-post.page';

describe('TelaPostPage', () => {
  let component: TelaPostPage;
  let fixture: ComponentFixture<TelaPostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
