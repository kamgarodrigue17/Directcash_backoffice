import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeteEmissionDialogComponent } from './requete-emission-dialog.component';

describe('AdminDialogComponent', () => {
  let component: RequeteEmissionDialogComponent;
  let fixture: ComponentFixture<RequeteEmissionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequeteEmissionDialogComponent]
    });
    fixture = TestBed.createComponent(RequeteEmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
