import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PosterDetailsComponent } from './components/shared/poster-details/poster-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieInfoComponent } from './components/shared/movie-info/movie-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PosterDetailsComponent,
    MovieInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
