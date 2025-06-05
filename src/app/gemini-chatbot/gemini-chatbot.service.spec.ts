import { TestBed } from '@angular/core/testing';

import { GeminiChatbotService } from './gemini-chatbot.service';

describe('GeminiChatbotService', () => {
  let service: GeminiChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
