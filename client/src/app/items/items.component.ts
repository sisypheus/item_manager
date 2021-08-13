import { FormComponent } from './../form/form.component';
import { FormHandlerService } from './../form-handler.service';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from '../item.service';
import { Item } from '../Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input('parentData') items: Item[] = [];
  public actionsRequest: boolean = false;
  public selectedItem!: Item;

  @ViewChild(FormComponent)
  private formComponent!: FormComponent;

  constructor(private ItemService: ItemService, private FormService: FormHandlerService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll',[]) onPageScroll(): void {
    if (!this.actionsRequest)
      return;
    this.actionsRequest = false;
    let popover = document.getElementById("popover");
    popover?.classList?.add("hidden");
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
    let width = popover.offsetWidth;
    popover.style.left = (x - width + 20) + 'px';
    popover.style.top = y + 'px';
  }

  public requestEdit(): void {
    this.formComponent.setItemEdit(this.selectedItem);
    this.formComponent.setForm();
    this.FormService.show = true;
  }

  public requestDelete(): void {
    this.deleteItem(this.selectedItem);
  }

  public addItem(item: Item): void {
    this.ItemService.modifyCount(item, +item.count+1).subscribe(
      (_: any) => {
        //this.getItems();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public removeItem(item: Item): void {
    this.ItemService.modifyCount(item, +item.count-1).subscribe(
      (_: any) => {
        //this.getItems();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public deleteItem(item: Item): void {
    this.ItemService.deleteItem(item.id).subscribe(
      (response: any) => {
        //this.getItems();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
}
