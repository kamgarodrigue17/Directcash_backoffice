import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportMomoOmComponent } from './rapport-momo-om.component';

describe('RapportMomoOmComponent', () => {
  let component: RapportMomoOmComponent;
  let fixture: ComponentFixture<RapportMomoOmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportMomoOmComponent]
    });
    fixture = TestBed.createComponent(RapportMomoOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
