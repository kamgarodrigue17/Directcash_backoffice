import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperAgentStepOneComponent } from './add-super-agent-step-one.component';

describe('AddSuperAgentStepOneComponent', () => {
  let component: AddSuperAgentStepOneComponent;
  let fixture: ComponentFixture<AddSuperAgentStepOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSuperAgentStepOneComponent]
    });
    fixture = TestBed.createComponent(AddSuperAgentStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
