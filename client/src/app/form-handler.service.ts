import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {
  public show: boolean = false;
  constructor() { }

  public open() : void {
    this.show = true;
  }

  public close() : void {
    this.show = false;
  }
}
