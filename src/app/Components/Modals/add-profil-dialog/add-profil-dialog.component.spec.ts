import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilDialogComponent } from './add-profil-dialog.component';

describe('AddProfilDialogComponent', () => {
  let component: AddProfilDialogComponent;
  let fixture: ComponentFixture<AddProfilDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProfilDialogComponent]
    });
    fixture = TestBed.createComponent(AddProfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
