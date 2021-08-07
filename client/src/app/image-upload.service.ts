import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private uploadURL!: String;
  constructor(private storage: AngularFireStorage) { }

  public async getDownloadUrl (file: File): Promise<String> {
    const filePath = `${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = await this.storage.upload(filePath, file);
    return this.storage.ref(filePath).getDownloadURL().toPromise();
  }
}
