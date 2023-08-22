import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlateformeComponent } from './admin-plateforme.component';

describe('AdminPlateformeComponent', () => {
  let component: AdminPlateformeComponent;
  let fixture: ComponentFixture<AdminPlateformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlateformeComponent]
    });
    fixture = TestBed.createComponent(AdminPlateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
