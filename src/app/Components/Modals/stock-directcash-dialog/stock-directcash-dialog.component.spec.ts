import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDirectcashDialogComponent } from './stock-directcash-dialog.component';

describe('StockDirectcashDialogComponent', () => {
  let component: StockDirectcashDialogComponent;
  let fixture: ComponentFixture<StockDirectcashDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockDirectcashDialogComponent]
    });
    fixture = TestBed.createComponent(StockDirectcashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
