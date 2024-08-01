import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerComponent } from '../../language-picker/language-picker-component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, TranslateModule, LanguagePickerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
