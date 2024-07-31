import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MenuComponent } from './menu-component/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, TranslateModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
