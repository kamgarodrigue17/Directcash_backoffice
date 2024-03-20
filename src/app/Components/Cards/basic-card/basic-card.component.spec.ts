import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCardComponent } from './basic-card.component';

describe('BasicCardComponent', () => {
  let component: BasicCardComponent;
  let fixture: ComponentFixture<BasicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicCardComponent]
    });
    fixture = TestBed.createComponent(BasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
