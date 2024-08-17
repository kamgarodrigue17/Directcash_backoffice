import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAgentsComponent } from './super-agents.component';

describe('SuperAgentsComponent', () => {
  let component: SuperAgentsComponent;
  let fixture: ComponentFixture<SuperAgentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAgentsComponent]
    });
    fixture = TestBed.createComponent(SuperAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
