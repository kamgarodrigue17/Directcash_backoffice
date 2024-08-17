import { TestBed } from '@angular/core/testing';

import { SuperAgentService } from './super-agent.service';

describe('SuperAgentService', () => {
  let service: SuperAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
