import { ImageUploadService } from './../image-upload.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormHandlerService } from '../form-handler.service';
import { finalize } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { Item } from '../Item';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public myForm!: FormGroup;
  public file!: File;
  @Output() triggerItemsFetchingEmitter = new EventEmitter<boolean>(false);

  constructor(private ImageService: ImageUploadService, private storage: AngularFireStorage, private ItemService: ItemService, private FormService: FormHandlerService, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      name: '',
      stock: 0,
      price: 0,
      category: '',
      description: '',
    });
  }

  onClose(): void {
    this.FormService.close();
  }

  formSubmit(): void {
    const item: Item = {
      id: '',
      name: this.myForm.value.name,
      price: this.myForm.value.price,
      count: this.myForm.value.stock,
      category: this.myForm.value.category,
      description: this.myForm.value.description,
      image: ''
    };

    //case user hasn't uploaded image
    if (!this.file) {
      this.ItemService.createItem(item).subscribe(
        (item: Item) => {
          this.cleanForm();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      //case user has uploaded image
    } else {
      this.ImageService.getDownloadUrl(this.file).then(
        (url: String) => {
          item.image = url;
          this.ItemService.createItem(item).subscribe(
            (item: Item) => {
              this.cleanForm();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
        }
      );
    }
  }

  cleanForm(): void {
    this.myForm.reset({
      name: '', price: 0, image: '', stock: 0, category: '', description: ''
    });
    this.FormService.close();
    this.triggerItemsFetchingEmitter.emit(true);
  }

  addCount(): void {
    this.myForm.patchValue({ stock: this.myForm.value.stock + 1 });
  }

  substractCount(): void {
    if (this.myForm.value.stock <= 0)
      return;
    this.myForm.patchValue({ stock: this.myForm.value.stock - 1 });
  }

  setImage(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files) {
      const file = files.item(0);
      if (file)
        this.file = file;
    }
  }

  getFormState(): boolean {
    return this.FormService.show;
  }
}
