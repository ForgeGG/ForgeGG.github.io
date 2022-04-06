import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxTweetModule } from 'ngx-tweet';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InformationChampionComponent } from './information-champion/information-champion.component';
import { FooterComponent } from './footer/footer.component';
import { TweetComponent } from './tweet/tweet.component';
import { SpotifyComponent } from './spotify/spotify.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InformationChampionComponent,
    FooterComponent,
    TweetComponent,
    SpotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxTweetModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
