import { ItemService } from './../item.service';
import { Component } from '@angular/core';
import { Item } from '../Item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchInput: String = '';
  public searchedItems: Item[] = [];

  constructor(private itemService: ItemService) { }

  checkKeyPressed(event: KeyboardEvent): void {
    const element = event.target as HTMLInputElement;
    this.searchInput = element.value;
    if (event.key === 'Enter' && this.searchInput !== '')
      this.submitSearch();
  }

  submitSearch(): void {
    console.log('Searching for: ' + this.searchInput);
    this.itemService.getItemsByName(this.searchInput).subscribe(
      (items) => this.searchedItems = items
    );
  }
}
