import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransMydirectcashDialogComponent } from './show-trans-mydirectcash-dialog.component';

describe('ShowTransMydirectcashDialogComponent', () => {
  let component: ShowTransMydirectcashDialogComponent;
  let fixture: ComponentFixture<ShowTransMydirectcashDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTransMydirectcashDialogComponent]
    });
    fixture = TestBed.createComponent(ShowTransMydirectcashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
