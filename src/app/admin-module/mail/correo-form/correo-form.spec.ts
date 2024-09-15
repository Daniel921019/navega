import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorreoForm } from './correo-form';

describe('CorreoForm', () => {
  let component: CorreoForm;
  let fixture: ComponentFixture<CorreoForm>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CorreoForm],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorreoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
