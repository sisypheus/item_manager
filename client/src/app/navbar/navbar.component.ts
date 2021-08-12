import { Component, OnInit, OnChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  hideCreateButton: Boolean = false;
  createButtonVisible: String = 'bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded ml-auto';
  layoutSpacer: String = 'py-2 px-4 invisible mr-auto';

  constructor(private FormService: FormHandlerService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url !== '/')
          this.hideCreateButton = true;
        else
          this.hideCreateButton = false;
      }
    });
  }

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
