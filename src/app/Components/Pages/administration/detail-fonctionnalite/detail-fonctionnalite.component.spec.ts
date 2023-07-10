import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFonctionnaliteComponent } from './detail-fonctionnalite.component';

describe('DetailFonctionnaliteComponent', () => {
  let component: DetailFonctionnaliteComponent;
  let fixture: ComponentFixture<DetailFonctionnaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFonctionnaliteComponent]
    });
    fixture = TestBed.createComponent(DetailFonctionnaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
