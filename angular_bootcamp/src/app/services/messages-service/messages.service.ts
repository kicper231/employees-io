import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];

  add(message: string) {
    this.messages.push({ message: message, id: this.messages.length.toString() });
  }

  clear() {
    this.messages = [];
  }
}
