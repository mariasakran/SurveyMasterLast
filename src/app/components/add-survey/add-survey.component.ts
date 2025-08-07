import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SurveyService } from '../../services/survey.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-survey',
  standalone: false,
  templateUrl: './add-survey.component.html',
  styleUrl: './add-survey.component.css',
})
export class AddSurveyComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  maxQuestions = 10;
  maxOptions = 5;
  surveyForm: FormGroup;
  addDone = false;
  addFaild = false;
  questionTypes = [
    { value: 'text', display: 'Text' },
    { value: 'checkbox', display: 'Checkbox' },
    { value: 'radio', display: 'radio' },
  ];
  categories: any;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      userid: [this.user.id],
      questions: this.fb.array([this.createQuestion()]),
    });
  }
  ngOnInit(): void {
    this.categoryService.AcceptedCategory().subscribe({
      next: async (data) => {
        this.categories = await data;
      },
    });
  }

  createQuestion(): FormGroup {
    const questionGroup = this.fb.group(
      {
        text: ['', Validators.required],
        questionType: ['', Validators.required],
        answerOptions: this.fb.array([this.createAnswerOption()]),
      },
      { validators: answerOptionsRequiredValidator() }
    );

    return questionGroup;
  }

  createAnswerOption(): FormGroup {
    return this.fb.group({
      text: [''],
    });
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  getAnswerOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answerOptions') as FormArray;
  }

  addQuestion(): void {
    if (this.questions.length < this.maxQuestions) {
      this.questions.push(this.createQuestion());
    } else {
      alert(`Maximum ${this.maxQuestions} questions allowed`);
    }
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addAnswerOption(questionIndex: number): void {
    const options = this.getAnswerOptions(questionIndex);
    if (options.length < this.maxOptions) {
      options.push(this.createAnswerOption());
    }
  }
  removeAnswerOption(questionIndex: number, answerIndex: number): void {
    this.getAnswerOptions(questionIndex).removeAt(answerIndex);
  }

  onQuestionTypeChange(questionIndex: number): void {
    const question = this.questions.at(questionIndex);
    const answerOptions = question.get('answerOptions') as FormArray;
    const questionType = question.get('questionType')?.value;

    if (questionType === 'text') {
      while (answerOptions.length !== 0) {
        answerOptions.removeAt(0);
      }
    } else if (answerOptions.length === 0) {
      answerOptions.push(this.createAnswerOption());
    }

    question.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      this.surveyService.createSurvey(this.surveyForm.value).subscribe({
        next: () => {
          this.addDone = true;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (err) => {
          this.addFaild = true;
        },
      });
    } else {
      this.markFormGroupTouched(this.surveyForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
export function answerOptionsRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const questionType = control.get('questionType')?.value;
    const answerOptions = control.get('answerOptions') as FormArray;

    if (questionType === 'text') {
      return null;
    }

    if (!answerOptions || answerOptions.length === 0) {
      return { answerOptionsRequired: true };
    }

    const hasNonEmpty = answerOptions.controls.some((option) =>
      option.get('text')?.value?.trim()
    );

    if (!hasNonEmpty) {
      return { answerOptionsRequired: true };
    }

    return null;
  };
}
