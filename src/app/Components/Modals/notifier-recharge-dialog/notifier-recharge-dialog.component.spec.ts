import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierRechargeDialogComponent } from './notifier-recharge-dialog.component';

describe('NotifierRechargeDialogComponent', () => {
  let component: NotifierRechargeDialogComponent;
  let fixture: ComponentFixture<NotifierRechargeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifierRechargeDialogComponent]
    });
    fixture = TestBed.createComponent(NotifierRechargeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
