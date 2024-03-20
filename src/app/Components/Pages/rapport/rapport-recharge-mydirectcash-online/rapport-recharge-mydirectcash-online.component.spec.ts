import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportRechargeMydirectcashOnlineComponent } from './rapport-recharge-mydirectcash-online.component';

describe('RapportRechargeMydirectcashOnlineComponent', () => {
  let component: RapportRechargeMydirectcashOnlineComponent;
  let fixture: ComponentFixture<RapportRechargeMydirectcashOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportRechargeMydirectcashOnlineComponent]
    });
    fixture = TestBed.createComponent(RapportRechargeMydirectcashOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
