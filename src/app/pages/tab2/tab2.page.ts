import { Article } from './../../interfaces/news.interfaces';
import { NewsService } from './../../services/news.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements AfterViewInit {
  @ViewChild(IonSegment) ionSegment: IonSegment;

  news: Article[] = [];

  categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  constructor(private newsService: NewsService) {}

  ngAfterViewInit(): void {
    this.ionSegment.value = this.categories[0];
    const category = this.ionSegment.value;
    this.newsCharge(category);
  }

  categoryChange() {
    this.news = [];
    const category = this.ionSegment.value;
    this.newsCharge(category);
  }

  async loadData(event) {
    this.newsCharge(this.ionSegment.value, event);
  }

  private newsCharge(category: string, event?): void {
    this.newsService.getNewsByCategory(category).subscribe((res) => {
      const articles = (res as any).articles;

      if (event && articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      }

      this.news.push(...(res as any).articles);

      if (event) {
        event.target.complete();
      }
    }, (error) => {
      if (event) {
        event.target.disabled = true;
        event.target.complete();
      }
    });
  }
}
