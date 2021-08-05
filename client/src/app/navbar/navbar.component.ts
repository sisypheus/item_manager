import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileMenu: boolean = false;

  @Output() public requestForm:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public sendFormRequest(): void {
    this.requestForm.emit(true);
  }

  public toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

}
