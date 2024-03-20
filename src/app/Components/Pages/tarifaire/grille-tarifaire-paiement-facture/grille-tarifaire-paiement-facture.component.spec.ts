import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTarifairePaiementFactureComponent } from './grille-tarifaire-paiement-facture.component';

describe('GrilleTarifairePaiementFactureComponent', () => {
  let component: GrilleTarifairePaiementFactureComponent;
  let fixture: ComponentFixture<GrilleTarifairePaiementFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTarifairePaiementFactureComponent]
    });
    fixture = TestBed.createComponent(GrilleTarifairePaiementFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
