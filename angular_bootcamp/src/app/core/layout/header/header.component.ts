import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerComponentComponent } from '../../language-picker-component/language-picker-component.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, TranslateModule, LanguagePickerComponentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
