import { Article } from '../../interfaces/news.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() i: number;

  constructor() { }

  ngOnInit() {}

}
