import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractFormFields } from './abstract-form-field';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { NgClass, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-input',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule, NgClass, MatInput, MatHint, MatError, NgIf, MatLabel, TranslateModule],
  templateUrl: './basic-input.component.html',
  styleUrl: './basic-input.component.scss',
})
export class BasicInputComponent extends AbstractFormFields {
  @Input() label?: string;
  @Input() placeholder = 'basic';
  @Input() type = 'text';
  @Input() maxLength = 100;
  @Input() validationMessage = 'Field required';

  @Output() leaveField: EventEmitter<string> = new EventEmitter<string>();

  constructor(override readonly parentFormGroup: FormGroupDirective) {
    super(parentFormGroup);
  }

  maxLengthError(): boolean {
    return this.formControl.value?.toString().length === this.maxLength;
  }
}
