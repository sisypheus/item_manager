import { LoadingService } from './loading.service';
import { FormComponent } from './form/form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Item } from './Item';
import { ItemService } from './item.service';
import { FormHandlerService } from './form-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
  }
}
