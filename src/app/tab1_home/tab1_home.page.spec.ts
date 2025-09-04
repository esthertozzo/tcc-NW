import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1HomePage } from './tab1_home.page';

describe('Tab1HomePage', () => {
  let component: Tab1HomePage;
  let fixture: ComponentFixture<Tab1HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1HomePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
