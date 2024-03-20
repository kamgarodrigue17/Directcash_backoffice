import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseDialogComponent } from './entreprise-dialog.component';

describe('EntrepriseDilogComponent', () => {
  let component: EntrepriseDialogComponent;
  let fixture: ComponentFixture<EntrepriseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepriseDialogComponent]
    });
    fixture = TestBed.createComponent(EntrepriseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
