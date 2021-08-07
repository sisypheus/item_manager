import { AngularFireStorage } from '@angular/fire/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHandlerService } from '../form-handler.service';
import { finalize, tap } from 'rxjs/operators';
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

  constructor(private storage: AngularFireStorage, private ItemService: ItemService, private FormService: FormHandlerService, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      name: '',
      stock: '',
      price: '',
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

    //make this a service
    const filePath = `${Date.now()}_${this.file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          item.image = url;
          this.ItemService.createItem(item).subscribe(
            (Response: Item) => {
              this.FormService.close();
              this.triggerItemsFetchingEmitter.emit(true);
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
        });
      }),
    )
    .subscribe();
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
