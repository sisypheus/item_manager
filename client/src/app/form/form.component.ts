import { Component, Output, EventEmitter } from '@angular/core';
import { FormHandlerService } from '../form-handler.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private FormService: FormHandlerService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.FormService.close();
  }

  getFormState(): boolean {
    return this.FormService.show;
  }
}
