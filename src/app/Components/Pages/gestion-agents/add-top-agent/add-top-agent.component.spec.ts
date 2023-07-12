import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopAgentComponent } from './add-top-agent.component';

describe('AddAgentComponent', () => {
  let component: AddTopAgentComponent;
  let fixture: ComponentFixture<AddTopAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentComponent]
    });
    fixture = TestBed.createComponent(AddTopAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
