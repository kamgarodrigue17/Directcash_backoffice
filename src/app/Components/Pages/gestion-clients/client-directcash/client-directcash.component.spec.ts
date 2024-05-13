import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDirectcashComponent } from './client-directcash.component';

describe('ClientDirectcashComponent', () => {
  let component: ClientDirectcashComponent;
  let fixture: ComponentFixture<ClientDirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDirectcashComponent]
    });
    fixture = TestBed.createComponent(ClientDirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
