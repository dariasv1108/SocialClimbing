import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingUpProfilePage } from './sing-up-profile.page';

describe('SingUpProfilePage', () => {
  let component: SingUpProfilePage;
  let fixture: ComponentFixture<SingUpProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingUpProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingUpProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
