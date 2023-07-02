import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentMydirectcashComponent } from './grille-transfert-argent-mydirectcash.component';

describe('GrilleTransfertArgentMydirectcashComponent', () => {
  let component: GrilleTransfertArgentMydirectcashComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentMydirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentMydirectcashComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentMydirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
