import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMonnaieComponent } from './creation-monnaie.component';

describe('CreationMonnaieComponent', () => {
  let component: CreationMonnaieComponent;
  let fixture: ComponentFixture<CreationMonnaieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationMonnaieComponent]
    });
    fixture = TestBed.createComponent(CreationMonnaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
