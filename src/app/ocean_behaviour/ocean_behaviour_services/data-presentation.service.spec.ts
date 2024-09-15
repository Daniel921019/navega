import { TestBed } from '@angular/core/testing';

import { DataPresentationService } from './data-presentation.service';

describe('DataPresentationService', () => {
  let service: DataPresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
