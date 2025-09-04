import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2ReconhecimentoFacialPage } from './tab2_reconhecimento-facial.page';

describe('Tab2ReconhecimentoFacialPage', () => {
  let component: Tab2ReconhecimentoFacialPage;
  let fixture: ComponentFixture<Tab2ReconhecimentoFacialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab2ReconhecimentoFacialPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2ReconhecimentoFacialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
