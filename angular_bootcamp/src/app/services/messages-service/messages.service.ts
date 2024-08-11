import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];

  public messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  addMessage(message: string) {
    const newMessage = { message: message, id: this.messages.length.toString() };
    this.messages.push(newMessage);

    this.messages$.next(this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.messages$.next(this.messages);
  }

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }
}
