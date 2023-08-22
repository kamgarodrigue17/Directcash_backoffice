import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportTransfertArgentDirectcashComponent } from './rapport-transfert-argent-directcash.component';

describe('RapportTransfertArgentDirectcashComponent', () => {
  let component: RapportTransfertArgentDirectcashComponent;
  let fixture: ComponentFixture<RapportTransfertArgentDirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportTransfertArgentDirectcashComponent]
    });
    fixture = TestBed.createComponent(RapportTransfertArgentDirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
