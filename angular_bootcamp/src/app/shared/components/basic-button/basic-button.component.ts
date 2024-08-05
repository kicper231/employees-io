import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-basic-button',
  standalone: true,
  imports: [MatButton, NgClass, MatMiniFabButton, MatFabButton],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss',
})
export class BasicButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isSmall: boolean = false;
  @Input() isRouterLinkActive: boolean = false;
  @Input() isHeader: boolean = false;

  @Output() clickEvent = new EventEmitter<Event>();

  onClick($event: Event): void {
    this.clickEvent.emit($event);
  }
}
