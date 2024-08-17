import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReclamationsComponent } from './gestion-reclamations.component';

describe('GestionReclamationsComponent', () => {
  let component: GestionReclamationsComponent;
  let fixture: ComponentFixture<GestionReclamationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionReclamationsComponent]
    });
    fixture = TestBed.createComponent(GestionReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
