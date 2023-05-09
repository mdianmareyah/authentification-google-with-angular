import { BookService } from './services/book.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './book/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
