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
      Authorization: `Bearer sk-test`,
    });
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
