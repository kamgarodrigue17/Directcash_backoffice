import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAirtimeComponent } from './rapport-airtime.component';

describe('RapportAirtimeComponent', () => {
  let component: RapportAirtimeComponent;
  let fixture: ComponentFixture<RapportAirtimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportAirtimeComponent]
    });
    fixture = TestBed.createComponent(RapportAirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
