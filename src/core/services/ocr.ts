import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment'
export interface OcrResponseItem {
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.api-ninjas.com/v1/imagetotext';

  // ⚠️ краще винести в environment.ts
  private readonly apiKey = environment.apiKay;

  extractText(file: File): Observable<OcrResponseItem[]> {

    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });

    return this.http.post<OcrResponseItem[]>(
      this.apiUrl,
      formData,
      { headers }
    );
  }
}