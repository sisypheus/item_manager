import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  public items: Item[] = [];

  mobileMenu: boolean = false;

  constructor(private ItemService: ItemService) {}

  ngOnInit() {
    this.getItems();
  }

  public toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

  public getItems(): void {
    this.ItemService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public addItem(item: Item): void {
    this.ItemService.modifyCount(item, +item.count+1).subscribe(
      (response: any) => {
        this.getItems();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public removeItem(item: Item): void {
    this.ItemService.modifyCount(item, +item.count-1).subscribe(
      (response: any) => {
        this.getItems();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public createItem(item: Item): void {
    
  }
}
