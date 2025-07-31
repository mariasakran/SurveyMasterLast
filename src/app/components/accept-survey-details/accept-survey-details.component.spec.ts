import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptSurveyDetailsComponent } from './accept-survey-details.component';

describe('AcceptSurveyDetailsComponent', () => {
  let component: AcceptSurveyDetailsComponent;
  let fixture: ComponentFixture<AcceptSurveyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptSurveyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptSurveyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
