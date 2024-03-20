import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAgentsComponent } from './top-agents.component';

describe('TopAgentsComponent', () => {
  let component: TopAgentsComponent;
  let fixture: ComponentFixture<TopAgentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopAgentsComponent]
    });
    fixture = TestBed.createComponent(TopAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
