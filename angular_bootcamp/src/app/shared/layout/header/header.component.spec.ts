import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let headerDe: DebugElement;
  let headerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    headerDe = fixture.debugElement;
    headerEl = headerDe.nativeElement;

    // translateService.addLangs(['pl', 'en']);
    translateService.setTranslation('en', {
      'header.title': 'Employees.io',
      'header.employees': 'Employees',
      'header.dashboard': 'Dashboard',
    });
    translateService.use('en');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain proper title', () => {
    // arrange
    const title = headerEl.querySelector('.header__page-title')!;

    // act assert
    expect(title.textContent).toContain('Employees.io');
  });

  it('should contain app-menu component', () => {
    // arrange act
    const menuElement = headerDe.query(By.css('app-menu'));

    // assert
    expect(menuElement).toBeTruthy();
  });

  it('should contain logo image', () => {
    // arrange act
    const menuElement = headerDe.query(By.css('img.header__icon'));

    // assert
    expect(menuElement).toBeTruthy();
  });
});
