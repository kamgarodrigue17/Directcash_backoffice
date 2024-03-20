import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReclamationDialogComponent } from './show-reclamation-dialog.component';

describe('ShowReclamationDialogComponent', () => {
  let component: ShowReclamationDialogComponent;
  let fixture: ComponentFixture<ShowReclamationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowReclamationDialogComponent]
    });
    fixture = TestBed.createComponent(ShowReclamationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
