import { FormComponent } from './form/form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Item } from './Item';
import { ItemService } from './item.service';
import { FormHandlerService } from './form-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:mouseup)': 'onPageClick($event)'
  }
})
export class AppComponent implements OnInit {
  public items: Item[] = [];
  public actionsRequest: boolean = false;
  public category: string = "All";

  public selectedItem!: Item;
  //child functions
  @ViewChild(FormComponent)
  private formComponent!: FormComponent;

  constructor(private ItemService: ItemService, private FormService: FormHandlerService) {}

  ngOnInit() {
    this.getItems();
  }

  public triggerRefresh(): void {
    this.getItems();
  }

  public requestEdit(): void {
    console.log(this.selectedItem);
    this.formComponent.setItemEdit(this.selectedItem);
    this.formComponent.setForm();
    this.FormService.show = true;
  }

  public setCategory(category: string): void {
    this.category = category;
    this.getItems();
  }

  public onPageClick(event: Event): void {
    if (!this.actionsRequest)
      return;
    const target = event.target as HTMLElement;
    if (target) {
      if (target.id !== "popover" && target.id !== "moreActions") {
        this.actionsRequest = false;
        document.getElementById("popover")?.classList?.add("hidden");
      }
    }
  }

  public itemActions(element: Event, item: Item): void {
    this.actionsRequest = true;
    this.selectedItem = item;
    const target = element.target as HTMLElement;
    let {x, y} = target.getBoundingClientRect();
    let popover = document.getElementById("popover");
    if (!popover)
      return;
    popover.classList.remove("hidden");
    popover.style.left = x + 'px';
    popover.style.top = y + 'px';
  }

  public getItems(): void {
    this.ItemService.getItemsByCategory(this.category).subscribe(
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
      (_: any) => {
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
