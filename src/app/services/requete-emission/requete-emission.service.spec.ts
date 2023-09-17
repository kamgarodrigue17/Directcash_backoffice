import { TestBed } from '@angular/core/testing';

import { RequeteEmissionService } from './requete-emission.service';

describe('RequeteEmissionService', () => {
  let service: RequeteEmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequeteEmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
