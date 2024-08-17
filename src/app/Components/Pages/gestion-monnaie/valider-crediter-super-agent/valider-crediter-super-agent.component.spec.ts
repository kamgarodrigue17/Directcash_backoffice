import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderCrediterSuperAgentComponent } from './valider-crediter-super-agent.component';

describe('ValiderCrediterSuperAgentComponent', () => {
  let component: ValiderCrediterSuperAgentComponent;
  let fixture: ComponentFixture<ValiderCrediterSuperAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiderCrediterSuperAgentComponent]
    });
    fixture = TestBed.createComponent(ValiderCrediterSuperAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
