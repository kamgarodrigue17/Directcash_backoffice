import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFonctionnaliteComponent } from './gestion-fonctionnalite.component';

describe('GestionFonctionnaliteComponent', () => {
  let component: GestionFonctionnaliteComponent;
  let fixture: ComponentFixture<GestionFonctionnaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFonctionnaliteComponent]
    });
    fixture = TestBed.createComponent(GestionFonctionnaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
