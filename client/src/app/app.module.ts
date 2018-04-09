import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Reviews} from '../providers/reviews/reviews';
import {AddReviewPage} from "../pages/add-review/add-review";
import {BrowserModule} from "@angular/platform-browser";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddReviewPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Reviews,
    StatusBar,
    SplashScreen
  ]
})
export class AppModule {
}
