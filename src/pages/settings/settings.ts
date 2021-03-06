import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  logout() {
    var rootNav = this.app.getRootNav();
    rootNav.setRoot('LoginPage');
  }

}
