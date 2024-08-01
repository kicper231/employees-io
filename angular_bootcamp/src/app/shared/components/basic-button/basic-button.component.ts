import { Component, HostBinding } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'button[basic-button]',
  standalone: true,
  imports: [],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss',
})
export class BasicButtonComponent extends MatButton {}
