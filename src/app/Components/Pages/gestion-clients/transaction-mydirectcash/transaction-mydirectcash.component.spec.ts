import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMydirectcashComponent } from './transaction-mydirectcash.component';

describe('TransactionMydirectcashComponent', () => {
  let component: TransactionMydirectcashComponent;
  let fixture: ComponentFixture<TransactionMydirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionMydirectcashComponent]
    });
    fixture = TestBed.createComponent(TransactionMydirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
