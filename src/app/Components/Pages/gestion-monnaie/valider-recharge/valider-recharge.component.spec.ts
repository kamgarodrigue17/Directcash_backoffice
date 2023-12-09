import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderRechargeComponent } from './valider-recharge.component';

describe('ValiderRechargeComponent', () => {
  let component: ValiderRechargeComponent;
  let fixture: ComponentFixture<ValiderRechargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiderRechargeComponent]
    });
    fixture = TestBed.createComponent(ValiderRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
