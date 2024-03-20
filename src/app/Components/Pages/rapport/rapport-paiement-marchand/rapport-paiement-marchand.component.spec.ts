import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementMarchandComponent } from './rapport-paiement-marchand.component';

describe('RapportPaiementMarchandComponent', () => {
  let component: RapportPaiementMarchandComponent;
  let fixture: ComponentFixture<RapportPaiementMarchandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportPaiementMarchandComponent]
    });
    fixture = TestBed.createComponent(RapportPaiementMarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
