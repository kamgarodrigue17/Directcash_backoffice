import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrediterSuperAgentComponent } from './crediter-super-agent.component';

describe('CrediterSuperAgentComponent', () => {
  let component: CrediterSuperAgentComponent;
  let fixture: ComponentFixture<CrediterSuperAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrediterSuperAgentComponent]
    });
    fixture = TestBed.createComponent(CrediterSuperAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
