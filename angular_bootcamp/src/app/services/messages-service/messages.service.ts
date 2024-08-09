import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  addMessage(message: string) {
    if (!message || message.trim() === '') {
      return;
    }

    const currentMessages: Message[] = this.messages$.getValue();
    const newMessage: Message = { message: message, id: currentMessages.length.toString() };
    this.messages$.next([...currentMessages, newMessage]);
  }

  clearMessages() {
    this.messages$.next([]);
  }

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }
}
