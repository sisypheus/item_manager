import { Component, OnInit } from '@angular/core';
import { FormHandlerService } from '../form-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  mobileMenu: boolean = false;

  constructor(private FormService: FormHandlerService) { }

  public sendFormRequest(): void {
    this.FormService.open();
  }

  public toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

}
