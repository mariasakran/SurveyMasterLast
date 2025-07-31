import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCategoryComponent } from './accept-category.component';

describe('AcceptCategoryComponent', () => {
  let component: AcceptCategoryComponent;
  let fixture: ComponentFixture<AcceptCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
