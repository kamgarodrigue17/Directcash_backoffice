import { TestBed } from '@angular/core/testing';

import { FonctionalitesService } from './fonctionalites.service';

describe('FonctionalitesService', () => {
  let service: FonctionalitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionalitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
