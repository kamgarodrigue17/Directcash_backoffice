import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTransfertArgentDirectcashComponent } from './grille-transfert-argent-directcash.component';

describe('GrilleTransfertArgentDirectcashComponent', () => {
  let component: GrilleTransfertArgentDirectcashComponent;
  let fixture: ComponentFixture<GrilleTransfertArgentDirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrilleTransfertArgentDirectcashComponent]
    });
    fixture = TestBed.createComponent(GrilleTransfertArgentDirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
