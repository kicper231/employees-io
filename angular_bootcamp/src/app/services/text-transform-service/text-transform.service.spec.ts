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
    const inputText = 'kapiszon';
    const expectedText = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should transform strings correctly in lowercase', () => {
    // arrange
    const inputText = 'KAPISZON';
    const expectedText = 'kapiszon';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with spaces between words in uppercase', () => {
    // arrange
    const inputText = 'KaRol Stasiek';
    const expectedText = 'KAROL STASIEK';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with spaces between words in lowercase', () => {
    // arrange
    const inputText = 'KaRol Stasiek';
    const expectedText = 'karol stasiek';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle mixed-case strings correctly in uppercase', () => {
    // arrange
    const inputText = 'kApiSzoN';
    const expectedText = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with number correctly in uppercase', () => {
    // arrange
    const inputText = 'kapiszon231';
    const expectedText = 'KAPISZON231';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with numbers correctly in lowercase', () => {
    // arrange
    const inputText = 'KAPISZON231';
    const expectedText = 'kapiszon231';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with number correctly in uppercase', () => {
    // arrange
    const inputText = 'kApiSzoN';
    const expectedText = 'KAPISZON';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle empty strings in uppercase', () => {
    // arrange
    const inputText = '';
    const expectedText = '';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle empty strings in lovercase', () => {
    // arrange
    const inputText = '';
    const expectedText = '';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with special characters in uppercase', () => {
    // arrange
    const inputText = 'kapiszon!@#';
    const expectedText = 'KAPISZON!@#';

    // act assert
    expect(service.toUpperCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with special characters in lowercase', () => {
    // arrange
    const inputText = 'KAPISZON!@#';
    const expectedText = 'kapiszon!@#';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with diacritical characters in lowercase', () => {
    // arrange
    const inputText = 'ZAŻÓŁĆ GĘŚLĄ JAŹŃ';
    const expectedText = 'zażółć gęślą jaźń';

    // act assert
    expect(service.toLowerCase(inputText)).toBe(expectedText);
  });

  it('should handle strings with diacritical characters in uppercase', () => {
    // arrange
    const inputText = 'zażółć gęślą jaźń';
    const expectedText = 'ZAŻÓŁĆ GĘŚLĄ JAŹŃ';

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
