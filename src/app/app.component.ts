import {
  Component,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { GeminiChatbotComponent } from './gemini-chatbot/gemini-chatbot.component';

@Component({
  selector: 'app-root',
  imports: [ChatbotComponent, GeminiChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
}
