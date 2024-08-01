import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MenuComponent } from './menu-component/menu.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BasicButtonComponent } from '../../components/basic-button/basic-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    MenuComponent,
    MatToolbar,
    MatButton,
    MatIcon,
    MatIconButton,
    BasicButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
