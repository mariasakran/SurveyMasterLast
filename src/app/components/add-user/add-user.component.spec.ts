import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUSERComponent } from './add-user.component';

describe('AddUSERComponent', () => {
  let component: AddUSERComponent;
  let fixture: ComponentFixture<AddUSERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUSERComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUSERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
