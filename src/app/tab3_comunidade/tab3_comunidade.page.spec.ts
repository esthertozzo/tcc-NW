import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3ComunidadePage } from './tab3_comunidade.page';

describe('Tab3ComunidadePage', () => {
  let component: Tab3ComunidadePage;
  let fixture: ComponentFixture<Tab3ComunidadePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab3ComunidadePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3ComunidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
