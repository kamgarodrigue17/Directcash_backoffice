import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMydirectcashComponent } from './client-mydirectcash.component';

describe('ClientMydirectcashComponent', () => {
  let component: ClientMydirectcashComponent;
  let fixture: ComponentFixture<ClientMydirectcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientMydirectcashComponent]
    });
    fixture = TestBed.createComponent(ClientMydirectcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
