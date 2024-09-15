import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OceanBehaviourPage } from './ocean_behaviour.page';

describe('DescriptiveAnalyticModulePage', () => {
  let component: OceanBehaviourPage;
  let fixture: ComponentFixture<OceanBehaviourPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OceanBehaviourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OceanBehaviourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
