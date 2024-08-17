import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeteEmissionComponent } from './requete-emission.component';

describe('RequeteEmissionComponent', () => {
  let component: RequeteEmissionComponent;
  let fixture: ComponentFixture<RequeteEmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequeteEmissionComponent]
    });
    fixture = TestBed.createComponent(RequeteEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
