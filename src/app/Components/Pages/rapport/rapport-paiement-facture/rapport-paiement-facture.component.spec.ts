import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementFactureComponent } from './rapport-paiement-facture.component';

describe('RapportPaiementFactureComponent', () => {
  let component: RapportPaiementFactureComponent;
  let fixture: ComponentFixture<RapportPaiementFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportPaiementFactureComponent]
    });
    fixture = TestBed.createComponent(RapportPaiementFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
