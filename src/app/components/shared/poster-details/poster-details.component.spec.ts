import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterDetailsComponent } from './poster-details.component';

describe('PosterDetailsComponent', () => {
  let component: PosterDetailsComponent;
  let fixture: ComponentFixture<PosterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosterDetailsComponent]
    });
    fixture = TestBed.createComponent(PosterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
