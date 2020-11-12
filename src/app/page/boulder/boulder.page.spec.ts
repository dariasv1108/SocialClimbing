import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoulderPage } from './boulder.page';

describe('BoulderPage', () => {
  let component: BoulderPage;
  let fixture: ComponentFixture<BoulderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoulderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoulderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
