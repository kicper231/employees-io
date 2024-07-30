import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-picker-component',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './language-picker-component.html',
  styleUrl: './language-picker-component.scss',
})
export class LanguagePickerComponent {
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'pl']);
    this.translate.use('pl');
  }
  setLanguage(value: string) {
    this.translate.use(value);
  }
}
