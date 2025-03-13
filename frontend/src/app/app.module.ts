import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    // autres composants ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    UserListComponent,
    // autres modules ici
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  //bootstrap: [AppComponent]
})
export class AppModule { }
