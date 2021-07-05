import { NewsComponent } from './news/news.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [NewComponent, NewsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NewComponent, NewsComponent],
})
export class ComponentsModule {}
