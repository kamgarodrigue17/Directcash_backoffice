import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAccountDialogComponent } from './block-account-dialog.component';

describe('BlockAccountDialogComponent', () => {
  let component: BlockAccountDialogComponent;
  let fixture: ComponentFixture<BlockAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockAccountDialogComponent]
    });
    fixture = TestBed.createComponent(BlockAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
