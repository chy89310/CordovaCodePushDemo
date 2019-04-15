import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private codePush: CodePush
  ) {
    this.initializeApp();

    this.platform.ready().then(() => {
      console.log('device ready');
      // Code push callback
      codePush.checkForUpdate().then((update) => {
        alert('check result ' + JSON.stringify(update));
        console.log(JSON.stringify(update));
        codePush.sync().subscribe(syncStatus => {
          let message = '';
          switch (syncStatus) {
            case 0:
            message = 'UP_TO_DATE';
            break;
            case 1:
            message = 'UPDATE_INSTALLED';
            break;
            case 2:
            message = 'UPDATE_IGNORED';
            break;
            case 3:
            message = 'ERROR';
            break;
            case 4:
            message = 'IN_PROGRESS';
            break;
            case 5:
            message = 'CHECKING_FOR_UPDATE';
            break;
            case 6:
            message = 'AWAITING_USER_ACTION';
            break;
            case 7:
            message = 'DOWNLOADING_PACKAGE';
            break;
            case 8:
            message = 'INSTALLING_UPDATE';
            break;
            default:
            message = 'unknown';
          }
          alert(message);
        });
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
