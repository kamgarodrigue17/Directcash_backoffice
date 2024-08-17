import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouchardComponent } from './mouchard.component';

describe('MouchardComponent', () => {
  let component: MouchardComponent;
  let fixture: ComponentFixture<MouchardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MouchardComponent]
    });
    fixture = TestBed.createComponent(MouchardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
