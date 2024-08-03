import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'pl']);
    this.translate.use('pl');
  }

  setLanguage(value: string) {
    this.translate.use(value);
  }
}
