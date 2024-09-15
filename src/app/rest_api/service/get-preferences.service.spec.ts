import { TestBed } from '@angular/core/testing';

import { GetPreferencesService } from './get-preferences.service';

describe('GetPreferencesService', () => {
  let service: GetPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
