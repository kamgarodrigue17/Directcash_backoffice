import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationRapportTransactionDirectcashComponent } from './show-information-rapport-transaction-directcash.component';

describe('ShowInformationRapportTransactionDirectcashComponent', () => {
  let component: ShowInformationRapportTransactionDirectcashComponent;
  let fixture: ComponentFixture<ShowInformationRapportTransactionDirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowInformationRapportTransactionDirectcashComponent]
    });
    fixture = TestBed.createComponent(ShowInformationRapportTransactionDirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
