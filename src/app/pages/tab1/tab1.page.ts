import { Article, News } from './../../interfaces/news.interfaces';
import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  news: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadData(event) {
    this.loadNews(event);
  }

  loadNews(event?) {
    this.newsService.getNews().subscribe(
      (res) => {
        const articles = (res as any).articles;

        if (event && articles === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.news.push(...articles);

        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.log(error.error);
        if (event) {
          event.target.disabled = true;
          event.target.complete();
        }
      }
    );
  }
}
