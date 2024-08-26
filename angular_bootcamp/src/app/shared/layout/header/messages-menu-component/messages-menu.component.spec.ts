import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MessagesMenuComponent } from './messages-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesService } from '../../../../services/messages-service/messages.service';
import { By } from '@angular/platform-browser';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MessagesMenuComponent', () => {
  let component: MessagesMenuComponent;
  let fixture: ComponentFixture<MessagesMenuComponent>;
  let messagesService: MessagesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesMenuComponent, TranslateModule.forRoot(), NoopAnimationsModule, BrowserAnimationsModule],
      providers: [MessagesService],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesMenuComponent);
    fixture.autoDetectChanges();

    messagesService = TestBed.inject(MessagesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one messages after adding a message in messagesService', () => {
    // arrange
    messagesService.addMessage('test1');
    fixture.whenStable();

    // act assert
    expect(component.listOfMessages.length).toBe(1);
  });

  it('should reset message list after click reset button', fakeAsync(async () => {
    // arrange
    messagesService.addMessage('test1');
    await fixture.whenStable();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menuHarness = await loader.getHarness(MatMenuHarness.with({ selector: '.menu__button' }));

    // act
    await menuHarness.open();
    const resetButtonDe = fixture.debugElement.query(By.css('app-basic-button'));
    expect(resetButtonDe).not.toBeNull();
    resetButtonDe.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    tick(1000);

    // assert
    expect(component.listOfMessages.length).toBe(0);
  }));
});
