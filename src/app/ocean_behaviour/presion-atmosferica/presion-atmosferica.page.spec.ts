import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresionAtmosfericaPage } from './presion-atmosferica.page';

describe('PresionAtmosfericaPage', () => {
  let component: PresionAtmosfericaPage;
  let fixture: ComponentFixture<PresionAtmosfericaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PresionAtmosfericaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresionAtmosfericaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
