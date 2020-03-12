import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateBoulderPage } from './create-boulder.page';

describe('CreateBoulderPage', () => {
  let component: CreateBoulderPage;
  let fixture: ComponentFixture<CreateBoulderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBoulderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBoulderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
