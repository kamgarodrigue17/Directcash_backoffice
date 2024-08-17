import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSuperAgengDialogComponent } from './show-super-ageng-dialog.component';

describe('ShowSuperAgengDialogComponent', () => {
  let component: ShowSuperAgengDialogComponent;
  let fixture: ComponentFixture<ShowSuperAgengDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSuperAgengDialogComponent]
    });
    fixture = TestBed.createComponent(ShowSuperAgengDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
