import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionParServiceComponent } from './commision-par-service.component';

describe('CommisionParServiceComponent', () => {
  let component: CommisionParServiceComponent;
  let fixture: ComponentFixture<CommisionParServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommisionParServiceComponent]
    });
    fixture = TestBed.createComponent(CommisionParServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
