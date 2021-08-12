import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '/', component: AppComponent },
  { path: 'test', component: FormComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, FormComponent];
