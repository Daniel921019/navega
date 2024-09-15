import { TestBed } from '@angular/core/testing';

import { GeneralAppService } from './general-app.service';

describe('GeneralAppService', () => {
  let service: GeneralAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
