import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextTransformService {
  toLowerCase(text: string): string {
    return text.toLowerCase();
  }

  toUpperCase(text: string): string {
    return text.toUpperCase();
  }
}
