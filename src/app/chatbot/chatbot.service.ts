import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  getBotMockResponse(message: string): Observable<string> {
    return of(`aap apki gaand maraiye. aur bille ki pappi bhi lelo`).pipe(
      delay(1000)
    );
  }

  getBotResponse(message: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    });
    //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
    //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
    return this.http
      .post<any>(
        'https://api.openai.com/v2/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        { headers }
      )
      .pipe(map((res) => res.choices[0].message.content));
  }
}
