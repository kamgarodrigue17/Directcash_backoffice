import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHabilitationComponent } from './gestion-habilitation.component';

describe('GestionHabilitationComponent', () => {
  let component: GestionHabilitationComponent;
  let fixture: ComponentFixture<GestionHabilitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionHabilitationComponent]
    });
    fixture = TestBed.createComponent(GestionHabilitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
