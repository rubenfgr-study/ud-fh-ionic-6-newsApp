/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
import { Article } from 'src/app/interfaces/news.interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  favorites$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private _favorites: Article[] = [];
  private _storage: Storage | null = null;

  get favorites(): Article[] {
    return this._favorites;
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const favorites = await this._storage.get('favorites');
    if (favorites) {
      this._favorites = JSON.parse(favorites);
      this.favorites$.next(this._favorites);
    }
  }

  saveNew(article: Article) {
    const exists = this._favorites?.find((n) => n.title === article.title);
    if (!exists) {
      this._favorites?.unshift(article);
      this._storage?.set('favorites', JSON.stringify(this._favorites));
      this.favorites$.next(this._favorites);
    }
  }

  removeNew(article: Article) {
    const exists = this._favorites?.find((n) => n.title === article.title);
    if (exists) {
      const index = this._favorites.indexOf(exists);
      this._favorites?.splice(index, 1);
      this._storage?.set('favorites', JSON.stringify(this._favorites));
      this.favorites$.next(this._favorites);
    }
  }
}
