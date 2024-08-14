import { Component } from '@angular/core';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatCard, MatCardHeader, NgOptimizedImage, TranslateModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {}
