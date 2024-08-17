import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportCollecteFondComponent } from './rapport-collecte-fond.component';

describe('RapportCollecteFondComponent', () => {
  let component: RapportCollecteFondComponent;
  let fixture: ComponentFixture<RapportCollecteFondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportCollecteFondComponent]
    });
    fixture = TestBed.createComponent(RapportCollecteFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
