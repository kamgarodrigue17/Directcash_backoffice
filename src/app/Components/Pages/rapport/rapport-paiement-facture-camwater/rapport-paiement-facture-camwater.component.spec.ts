import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementFactureCamwaterComponent } from './rapport-paiement-facture-camwater.component';

describe('RapportPaiementMarchandComponent', () => {
  let component: RapportPaiementFactureCamwaterComponent;
  let fixture: ComponentFixture<RapportPaiementFactureCamwaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportPaiementFactureCamwaterComponent]
    });
    fixture = TestBed.createComponent(RapportPaiementFactureCamwaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
