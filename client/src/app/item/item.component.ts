import { Item } from './../Item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public spotlight!: Item | null;

  constructor() { }

  ngOnInit(): void {
    this.spotlight = history.state.data?.selectedItem;
    if (!this.spotlight) {
      this.spotlight = (JSON.parse(localStorage.getItem('spotlight') || '{}') as Item);
    } else {
      localStorage.removeItem('spotlight');
      localStorage.setItem('spotlight', JSON.stringify(this.spotlight));
    }
  }


}
