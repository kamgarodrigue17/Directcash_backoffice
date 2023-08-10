import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTarifairePaiementMarchandComponent } from './grille-tarifaire-paiement-marchand.component';

describe('GrilleTarifairePaiementMarchandComponent', () => {
  let component: GrilleTarifairePaiementMarchandComponent;
  let fixture: ComponentFixture<GrilleTarifairePaiementMarchandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTarifairePaiementMarchandComponent]
    });
    fixture = TestBed.createComponent(GrilleTarifairePaiementMarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
