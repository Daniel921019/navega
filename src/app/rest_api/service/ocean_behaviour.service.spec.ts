import { TestBed } from '@angular/core/testing';

import { OceanBehaviorService } from './ocean_behaviour.service';

describe('DescriptiveAnalyticModuleService', () => {
  let service: OceanBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OceanBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
