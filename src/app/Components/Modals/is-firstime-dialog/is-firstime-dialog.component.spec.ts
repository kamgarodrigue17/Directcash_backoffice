import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsFirstimeDialogComponent } from './is-firstime-dialog.component';

describe('IsFirstimeDialogComponent', () => {
  let component: IsFirstimeDialogComponent;
  let fixture: ComponentFixture<IsFirstimeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsFirstimeDialogComponent]
    });
    fixture = TestBed.createComponent(IsFirstimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
