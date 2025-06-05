import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiChatbotService } from './gemini-chatbot.service';
import { ChatMessage } from './models/chat-message.model';

@Component({
  selector: 'app-gemini-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './gemini-chatbot.component.html',
  styleUrl: './gemini-chatbot.component.scss',
  providers: [GeminiChatbotService],
})
export class GeminiChatbotComponent {
  messages = signal<ChatMessage[]>([]);
  userMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  showBot: boolean = true;

  constructor(private geminiService: GeminiChatbotService) {
    effect(() => {
      this.messages();
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
    });
  }

  ngOnInit(): void {}

  async sendMessage(): Promise<void> {
    const messageText = this.userMessage().trim();
    if (!messageText) return;
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      { text: messageText, sender: 'user' },
    ]);
    this.userMessage.set('');

    this.geminiService.sendMessage(messageText).subscribe({
      next: (botResponse: any) => {
        this.messages.update((prev) => [
          ...prev,
          { text: botResponse, sender: 'bot' },
        ]);
        this.isLoading.set(false);
      },
      error: () => {
        this.messages.update((prev) => [
          ...prev,
          { text: 'Oops! Something went wrong.', sender: 'bot' },
        ]);
        this.isLoading.set(false);
      },
    });
  }

  clearChat(): void {
    this.messages.set([]);
    this.geminiService.clearChatHistory();
  }
}
