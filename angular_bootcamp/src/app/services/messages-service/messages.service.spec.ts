import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { Message } from '../../models/message.model';

describe('MessagesService', () => {
  let service: MessagesService;
  const message1 = 'Kaczka';
  const message2 = 'Struś';
  const message3 = 'Zając';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send notification', () => {
    // arrange
    const spy = spyOn(service, 'addMessage');
    // act
    service.addMessage(message1);

    // assert
    expect(spy).toHaveBeenCalledWith(message1);
  });

  it('should return an empty list initially', () => {
    // arrange

    // act

    // assert
    expect(service.messages$.getValue().length).toBe(0);
    expect(service.messages$.getValue()).toEqual([]);
  });

  it('should add a new message correctly', () => {
    // arrange
    const lengthBefore: number = service.messages$.getValue().length;

    // act
    service.addMessage(message1);

    // assert
    expect(service.messages$.getValue().length).toBe(lengthBefore + 1);
    expect(service.messages$.getValue().pop()?.message).toBe(message1);
  });

  it('should handle adding multiple messages correctly', () => {
    // arrange
    const initialMessages: Message[] = service.messages$.getValue();
    const lengthBefore: number = initialMessages.length;

    // act
    service.addMessage(message1);
    service.addMessage(message2);
    service.addMessage(message3);

    // assert
    const currentMessages: Message[] = service.messages$.getValue();
    expect(currentMessages.length).toBe(lengthBefore + 3);

    expect(currentMessages[lengthBefore].message).toBe(message1);
    expect(currentMessages[lengthBefore + 1].message).toBe(message2);
    expect(currentMessages[lengthBefore + 2].message).toBe(message3);
  });

  it('should generate unique IDs for each message', () => {
    // arrange
    const message1 = 'First message';
    const message2 = 'Second message';

    // act
    service.addMessage(message1);
    service.addMessage(message2);

    // assert
    const messages: Message[] = service.messages$.getValue();
    const id1: string = messages[messages.length - 2].id;
    const id2: string = messages[messages.length - 1].id;

    expect(id1).not.toBe(id2);
  });

  it('should clear all messages', () => {
    // arrange
    service.addMessage(message1);
    service.addMessage(message3);
    service.addMessage(message2);

    // act
    service.clearMessages();

    // assert
    expect(service.messages$.getValue().length).toBe(0);
    expect(service.messages$.getValue()).toEqual([]);
  });

  it('should return the current list of messages as an observable and contain the correct messages', (done: DoneFn) => {
    // arrange
    service.addMessage(message1);
    service.addMessage(message2);

    // act assert
    service.getMessages().subscribe((value: Message[]) => {
      expect(value.length).toBe(2);
      expect(value[0].message).toBe(message1);
      expect(value[1].message).toBe(message2);
      done();
    });
  });

  it('should not add a empty message', () => {
    // arrange
    const emptyMessage1 = '';
    const emptyMessage2 = ' ';

    // act
    service.addMessage(emptyMessage1);
    service.addMessage(emptyMessage2);

    // assert
    expect(service.messages$.getValue().length).toBe(0);
    expect(service.messages$.getValue()).toEqual([]);
  });

  it('should not add a message if the input is null or undefined', () => {
    // arrange
    const wrongMessage1 = undefined;
    const wrongMessage2 = null;

    // act
    service.addMessage(wrongMessage1!);
    service.addMessage(wrongMessage2!);

    // assert
    expect(service.messages$.getValue().length).toBe(0);
    expect(service.messages$.getValue()).toEqual([]);
  });

  it('should properly emit updates when messages are added', (done) => {
    // arrange
    let messageList: Message[] = [];
    service.addMessage(message2);

    // act assert
    service.getMessages().subscribe((value: Message[]) => {
      messageList = value;
      expect(messageList.length).toBe(1);
      done();
    });
  });
});
