/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Article } from './../interfaces/news.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = environment.baseUrl;
  private apiKey = environment.apiKey;
  private everythingPage = 0;
  private headLinePage = 0;

  private categoryActual = '';
  private categoryPage = 0;

  private headers = new HttpHeaders({
    'X-Api-key': this.apiKey,
  });

  constructor(private http: HttpClient) {}

  getNews() {
    this.everythingPage++;
    return this.execQuery<Article[]>(
      `/everything?q=tesla&sortBy=publishedAt&language=es&page=${this.everythingPage}`
    );
  }

  getNewsByCategory(category: string) {
    if (this.categoryActual === category) {
      this.headLinePage++;
    } else {
      this.headLinePage = 1;
      this.categoryActual = category;
    }

    return this.execQuery<Article[]>(
      `/top-headlines?category=${category}&sortBy=publishedAt&country=us&page=${this.headLinePage}`
    );
  }

  private execQuery<T>(query: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + query, {
      headers: this.headers,
    });
  }
}
