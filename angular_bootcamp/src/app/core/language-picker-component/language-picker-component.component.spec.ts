import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePickerComponentComponent } from './language-picker-component.component';

describe('LanguagePickerComponentComponent', () => {
  let component: LanguagePickerComponentComponent;
  let fixture: ComponentFixture<LanguagePickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagePickerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagePickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
