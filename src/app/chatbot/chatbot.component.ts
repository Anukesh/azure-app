import { Component } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  messages: { sender: string; text: string }[] = [];
  userInput = '';
  loading = false;

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.loading = true;

    this.chatbotService.getBotMockResponse(input).subscribe((response) => {
      this.messages.push({ sender: 'bot', text: response });
      this.loading = false;
    });
  }
}
