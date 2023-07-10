import { TestBed } from '@angular/core/testing';

import { PlafondService } from './plafond.service';

describe('PlafondService', () => {
  let service: PlafondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlafondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
