import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptSurveyComponent } from './accept-survey.component';

describe('AcceptSurveyComponent', () => {
  let component: AcceptSurveyComponent;
  let fixture: ComponentFixture<AcceptSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
