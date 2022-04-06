import { TestBed } from '@angular/core/testing';

import { InfoChampService } from './info-champ.service';

describe('InfoChampService', () => {
  let service: InfoChampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoChampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
