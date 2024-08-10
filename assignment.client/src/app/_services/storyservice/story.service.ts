import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

export interface StoryItemDetails {
  data: any[];
  isSuccess?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  apiUrl = '';
  constructor(private http: HttpClient) {
    this.apiUrl = 'https://localhost:7069/api/Story/';
  }

  getDetail(takeRecord: number) {
    return this.http.get<StoryItemDetails>(this.apiUrl + 'getstorydetails?takeRecord=' + takeRecord)
      .pipe(map(data => {
        return data;
      }));
  }
}
