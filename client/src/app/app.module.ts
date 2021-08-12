import { InterceptorService } from './interceptor.service';
import { ItemService } from './item.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { AppRoutingModule } from './app-routing.module';

const config = {
  apiKey: "AIzaSyAUhUZCFsHn7yr7mcPv6mHEFoqxF8wxD8g",
  authDomain: "image-manager-3fda3.firebaseapp.com",
  projectId: "image-manager-3fda3",
  storageBucket: "image-manager-3fda3.appspot.com",
  messagingSenderId: "741301219861",
  appId: "1:741301219861:web:91cf7eddde4976c47e941c"
};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
  ],
  providers: [
    ItemService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
