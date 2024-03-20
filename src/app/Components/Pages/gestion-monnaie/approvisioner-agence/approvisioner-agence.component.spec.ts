import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionerAgenceComponent } from './approvisioner-agence.component';

describe('ApprovisionerAgenceComponent', () => {
  let component: ApprovisionerAgenceComponent;
  let fixture: ComponentFixture<ApprovisionerAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovisionerAgenceComponent]
    });
    fixture = TestBed.createComponent(ApprovisionerAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
