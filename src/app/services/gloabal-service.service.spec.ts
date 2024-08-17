import { TestBed } from '@angular/core/testing';

import { GloabalServiceService } from './gloabal-service.service';

describe('GloabalServiceService', () => {
  let service: GloabalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloabalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
