import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeurDialogComponent } from './distributeur-dialog.component';

describe('DistributeurDialogComponent', () => {
  let component: DistributeurDialogComponent;
  let fixture: ComponentFixture<DistributeurDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributeurDialogComponent]
    });
    fixture = TestBed.createComponent(DistributeurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
