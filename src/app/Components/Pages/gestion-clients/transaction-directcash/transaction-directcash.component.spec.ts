import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDirectcashComponent } from './transaction-directcash.component';

describe('TransactionDirectcashComponent', () => {
  let component: TransactionDirectcashComponent;
  let fixture: ComponentFixture<TransactionDirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionDirectcashComponent]
    });
    fixture = TestBed.createComponent(TransactionDirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
