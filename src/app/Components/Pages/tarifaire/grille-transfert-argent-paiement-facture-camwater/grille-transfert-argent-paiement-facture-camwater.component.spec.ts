import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentPaiementFactureCamwaterComponent } from './grille-transfert-argent-paiement-facture-camwater.component';

describe('GrilleTransfertArgentPaiementFactureCamwaterComponent', () => {
  let component: GrilleTransfertArgentPaiementFactureCamwaterComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentPaiementFactureCamwaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentPaiementFactureCamwaterComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentPaiementFactureCamwaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
