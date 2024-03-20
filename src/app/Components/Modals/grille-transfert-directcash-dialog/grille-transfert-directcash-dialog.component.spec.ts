import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertDirectcashDialogComponent } from './grille-transfert-directcash-dialog.component';

describe('GrilleTransfertDirectcashDialogComponent', () => {
  let component: GrilleTransfertDirectcashDialogComponent;
  let fixture: ComponentFixture<GrilleTransfertDirectcashDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertDirectcashDialogComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertDirectcashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
