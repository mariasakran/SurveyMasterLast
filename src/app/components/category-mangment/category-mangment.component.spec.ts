import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMangmentComponent } from './category-mangment.component';

describe('CategoryMangmentComponent', () => {
  let component: CategoryMangmentComponent;
  let fixture: ComponentFixture<CategoryMangmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryMangmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryMangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
