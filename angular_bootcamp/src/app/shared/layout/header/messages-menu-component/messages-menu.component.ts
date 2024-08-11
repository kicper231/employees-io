import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { BasicButtonComponent } from '../../../components/basic-button/basic-button.component';
import { MessagesService } from '../../../../services/messages-service/messages.service';
import { Message } from '../../../../models/message.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-messages-menu',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatMenu, MatMenuItem, TranslateModule, MatMenuTrigger, BasicButtonComponent],
  templateUrl: './messages-menu.component.html',
  styleUrl: './messages-menu.component.scss',
})
export class MessagesMenuComponent implements OnInit {
  listOfMessages: Message[] = [];
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.messageService
      .getMessages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((messages: Message[]) => (this.listOfMessages = messages));
  }

  clearMessages(): void {
    this.messageService.clearMessages();
  }
}
