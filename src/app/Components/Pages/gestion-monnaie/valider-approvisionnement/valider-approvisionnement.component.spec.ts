import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderApprovisionnementComponent } from './valider-approvisionnement.component';

describe('ValiderApprovisionnementComponent', () => {
  let component: ValiderApprovisionnementComponent;
  let fixture: ComponentFixture<ValiderApprovisionnementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiderApprovisionnementComponent]
    });
    fixture = TestBed.createComponent(ValiderApprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
