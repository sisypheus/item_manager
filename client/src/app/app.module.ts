import { ItemService } from './item.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
