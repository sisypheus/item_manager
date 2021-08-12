import { Component, OnInit } from '@angular/core';
import { FormHandlerService } from '../form-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  mobileMenu: boolean = false;
  //styles for desktop
  selected: String = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium';
  unselected: String = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
  //styles for mobile
  selectedMobile: String = 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium';
  unselectedMobile: String = 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium';
  options: Object = {0: "home", 1:"search"};
  itemSelected: Number = 0;

  constructor(private FormService: FormHandlerService) { }

  public sendFormRequest(): void {
    this.FormService.open();
  }

  public toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

  public toggleSelected(index: Number): void {
    this.itemSelected = index;
  }
}
