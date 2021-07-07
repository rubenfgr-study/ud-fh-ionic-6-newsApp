import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private statusBar: StatusBar) {}

  ngOnInit(): void {
    // this.statusBar.overlaysWebView(true);
    // this.statusBar.styleBlackTranslucent();
  }
}
