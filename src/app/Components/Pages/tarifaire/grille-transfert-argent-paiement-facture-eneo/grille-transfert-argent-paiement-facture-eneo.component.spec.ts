import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentPaiementFactureEneoComponent } from './grille-transfert-argent-paiement-facture-eneo.component';

describe('GrilleTransfertArgentPaiementFactureEneoComponent', () => {
  let component: GrilleTransfertArgentPaiementFactureEneoComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentPaiementFactureEneoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentPaiementFactureEneoComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentPaiementFactureEneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
