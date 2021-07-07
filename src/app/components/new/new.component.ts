import { DataLocalService } from './../../services/data-local.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Article } from '../../interfaces/news.interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() index: number;
  @Input() inFavorites = false;

  constructor(
    private inAppbrowser: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  openNew() {
    console.log(this.new.url);
    this.inAppbrowser.create(this.new.url);
  }

  async launchMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Compartir');
            this.socialSharing.share(
              this.new.title,
              this.new.source.name,
              '',
              this.new.url
            );
          },
        },
        {
          text: this.inFavorites
            ? 'Borrar de favoritos'
            : 'Agregar a favoritos',
          icon: this.inFavorites ? 'trash' : 'star',
          cssClass: 'action-dark',
          handler: () => {
            if (this.inFavorites) {
              this.dataLocalService.removeNew(this.new);
              this.presentToast('Borrado de favoritos');
            } else {
              this.dataLocalService.saveNew(this.new);
              this.presentToast('Agregado a favoritos');
            }
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancelar');
          },
        },
      ],
    });
    await actionSheet.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      cssClass: 'toast-text-color'
    });
    toast.present();
  }
}
