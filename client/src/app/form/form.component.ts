import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input('parentData') public showForm: boolean = false;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onCloseForm: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onClose(): void {
    this.onCloseForm.emit(false);
  }
}
