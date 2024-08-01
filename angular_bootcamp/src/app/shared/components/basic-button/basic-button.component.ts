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
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() isDelete = false;
  @Input() isSmall = false;

  @Output() clickEvent = new EventEmitter<Event>();

  onClick($event: Event): void {
    this.clickEvent.emit($event);
  }
}
