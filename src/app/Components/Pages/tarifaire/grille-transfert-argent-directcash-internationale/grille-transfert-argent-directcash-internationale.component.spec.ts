import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentDirectcashInternationaleComponent } from './grille-transfert-argent-directcash-internationale.component';

describe('GrilleTransfertArgentDirectcashInternationaleComponent', () => {
  let component: GrilleTransfertArgentDirectcashInternationaleComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentDirectcashInternationaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentDirectcashInternationaleComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentDirectcashInternationaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
