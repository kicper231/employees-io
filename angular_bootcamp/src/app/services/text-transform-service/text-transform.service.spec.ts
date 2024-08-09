import { TestBed } from '@angular/core/testing';

import { TextTransformService } from './text-transform.service';

describe('TextTransformService', () => {
  let service: TextTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform strings correctly in uppercase', () => {
    // arrange
    const inputText: string = 'kapiszon';
    const expectedText: string = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should transform strings correctly in lowercase', () => {
    // arrange
    const inputText: string = 'KAPISZON';
    const expectedText: string = 'kapiszon';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with spaces between words in uppercase', () => {
    // arrange
    const inputText: string = 'KaRol Stasiek';
    const expectedText: string = 'KAROL STASIEK';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with spaces between words in lowercase', () => {
    // arrange
    const inputText: string = 'KaRol Stasiek';
    const expectedText: string = 'karol stasiek';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle mixed-case strings correctly in uppercase', () => {
    // arrange
    const inputText: string = 'kApiSzoN';
    const expectedText: string = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with number correctly in uppercase', () => {
    // arrange
    const inputText: string = 'kapiszon231';
    const expectedText: string = 'KAPISZON231';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with numbers correctly in lowercase', () => {
    // arrange
    const inputText: string = 'KAPISZON231';
    const expectedText: string = 'kapiszon231';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with number correctly in uppercase', () => {
    // arrange
    const inputText: string = 'kApiSzoN';
    const expectedText: string = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle empty strings in uppercase', () => {
    // arrange
    const inputText: string = '';
    const expectedText: string = '';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle empty strings in lovercase', () => {
    // arrange
    const inputText: string = '';
    const expectedText: string = '';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with special characters in uppercase', () => {
    // arrange
    const inputText: string = 'kapiszon!@#';
    const expectedText: string = 'KAPISZON!@#';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with special characters in lowercase', () => {
    // arrange
    const inputText: string = 'KAPISZON!@#';
    const expectedText: string = 'kapiszon!@#';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with diacritical characters in lowercase', () => {
    // arrange
    const inputText: string = 'ZAŻÓŁĆ GĘŚLĄ JAŹŃ';
    const expectedText: string = 'zażółć gęślą jaźń';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with diacritical characters in uppercase', () => {
    // arrange
    const inputText: string = 'zażółć gęślą jaźń';
    const expectedText: string = 'ZAŻÓŁĆ GĘŚLĄ JAŹŃ';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle very long strings in uppercase', () => {
    // arrange
    const inputText: string = 'k'.repeat(10000);
    const expectedText: string = 'K'.repeat(10000);

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle very long strings in lowercase', () => {
    // arrange
    const inputText: string = 'A'.repeat(10000);
    const expectedText: string = 'a'.repeat(10000);

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });
});
