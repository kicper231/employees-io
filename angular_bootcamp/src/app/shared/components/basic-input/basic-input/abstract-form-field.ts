import { Directive, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Directive()
export abstract class AbstractFormFields implements OnInit {
  @Input() controlName = '';
  @Input() fieldId = '';

  formControl: FormControl = new FormControl({});

  protected _isRequired = false;
  protected constructor(protected readonly parentFormGroup: FormGroupDirective) {}

  get isRequired(): boolean {
    return this._isRequired;
  }

  @Input() set isRequired(value: boolean) {
    this._isRequired = value;
  }

  ngOnInit(): void {
    this.formControl = this.parentFormGroup.form.get(this.controlName) as FormControl;
  }
}
