import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentDirectcashInternationalComponent } from './grille-transfert-argent-directcash-internationale.component';

describe('GrilleTransfertArgentDirectcashComponent', () => {
  let component: GrilleTransfertArgentDirectcashInternationalComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentDirectcashInternationalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentDirectcashInternationalComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentDirectcashInternationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
