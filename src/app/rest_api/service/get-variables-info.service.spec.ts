import { TestBed } from '@angular/core/testing';

import { GetVariablesInfoService } from './get-variables-info.service';

describe('GetVariablesInfoService', () => {
  let service: GetVariablesInfoService;
console.log( "get-variable-info  DFV..:"+service);
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVariablesInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
