import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from './models/chat-message.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GeminiChatbotService {
  private genAI = new GoogleGenerativeAI(environment.geminiApiKey);
  private model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  private chatHistory: { role: string; parts: { text: string }[] }[] = [];

  constructor() {}

  sendMessage(message: string): Observable<string> {
    this.chatHistory.push({ role: 'user', parts: [{ text: message }] });
    return from(
      this.model.generateContent({ contents: this.chatHistory })
    ).pipe(
      map((result) => {
        const responseText = result.response.text();
        this.chatHistory.push({
          role: 'model',
          parts: [{ text: responseText }],
        });
        return responseText;
      })
    );
  }

  getChatHistory(): ChatMessage[] {
    return this.chatHistory.map((entry) => ({
      text: entry.parts[0].text,
      sender: entry.role === 'user' ? 'user' : 'bot',
    }));
  }

  clearChatHistory(): void {
    this.chatHistory = [];
  }
}
