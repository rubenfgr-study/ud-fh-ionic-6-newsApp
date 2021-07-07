import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  @Input() news: Article[];
  @Input() inFavorites = false;
}
