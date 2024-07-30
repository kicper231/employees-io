import { Component } from '@angular/core';
import { MessagesService } from '../../../services/messages-service/messages.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(public messageService: MessagesService) {}
}
