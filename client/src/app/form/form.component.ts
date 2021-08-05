import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHandlerService } from '../form-handler.service';
import { ItemService } from '../item.service';
import { Item } from '../Item';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public myForm: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private ItemService: ItemService, private FormService: FormHandlerService, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      name: '',
      stock: '',
      price: '',
      imageUrl: '',
      category: '',
      description: ''
    });
  }

  onClose(): void {
    this.FormService.close();
  }

  formSubmit(): void {
    const item: Item = {
      id: '',
      name: this.myForm.get('name').value,
      price: this.myForm.get('price').value,
      count: this.myForm.get('stock').value,
      category: this.myForm.get('category').value,
      description: this.myForm.get('description').value,
      image: this.myForm.get('imageUrl').value
    };
    console.log(item);
    this.ItemService.createItem(item).subscribe(
      (Response: Item) => {
        console.log('ici');
        this.FormService.close();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getFormState(): boolean {
    return this.FormService.show;
  }
}
