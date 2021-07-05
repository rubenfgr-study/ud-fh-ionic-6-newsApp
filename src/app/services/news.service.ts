import { Article } from './../interfaces/news.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<Article[]> {
    return this.http
      .get<News>(
        'https://newsapi.org/v2/everything?q=tesla&from=2021-06-05&sortBy=publishedAt&apiKey=ab3cfb7e77454a53866130f3b5b7f74e'
      )
      .pipe(map((v) => v.articles));
  }
}
