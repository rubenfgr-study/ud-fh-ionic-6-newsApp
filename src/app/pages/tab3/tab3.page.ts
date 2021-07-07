import { Article } from 'src/app/interfaces/news.interfaces';
import { DataLocalService } from './../../services/data-local.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favorites: Article[] = [];
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(public dataLocalService: DataLocalService) {}

  ngOnInit(): void {
    this.dataLocalService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}
