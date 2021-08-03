import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input('parentData') public showForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
