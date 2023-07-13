import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementFactureEneoComponent } from './rapport-paiement-facture-eneo.component';

describe('RapportPaiementMarchandComponent', () => {
  let component: RapportPaiementFactureEneoComponent;
  let fixture: ComponentFixture<RapportPaiementFactureEneoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportPaiementFactureEneoComponent]
    });
    fixture = TestBed.createComponent(RapportPaiementFactureEneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
