import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { BasicButtonComponent } from '../../components/basic-button/basic-button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, MatButton, BasicButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
