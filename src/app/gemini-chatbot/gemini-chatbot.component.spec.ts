import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeminiChatbotComponent } from './gemini-chatbot.component';

describe('GeminiChatbotComponent', () => {
  let component: GeminiChatbotComponent;
  let fixture: ComponentFixture<GeminiChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeminiChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeminiChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
