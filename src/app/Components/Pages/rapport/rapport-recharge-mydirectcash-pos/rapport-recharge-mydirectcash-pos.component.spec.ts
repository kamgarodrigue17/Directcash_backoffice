import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportRechargeMydirectcashPosComponent } from './rapport-recharge-mydirectcash-pos.component';

describe('RapportRechargeMydirectcashPosComponent', () => {
  let component: RapportRechargeMydirectcashPosComponent;
  let fixture: ComponentFixture<RapportRechargeMydirectcashPosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportRechargeMydirectcashPosComponent]
    });
    fixture = TestBed.createComponent(RapportRechargeMydirectcashPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
