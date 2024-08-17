import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeOnlineComponent } from './recharge-online.component';

describe('RechargeOnlineComponent', () => {
  let component: RechargeOnlineComponent;
  let fixture: ComponentFixture<RechargeOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeOnlineComponent]
    });
    fixture = TestBed.createComponent(RechargeOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
