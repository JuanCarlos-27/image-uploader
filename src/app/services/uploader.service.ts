import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  constructor() {}

  private storage = inject(Storage);
  private storageRef = ref(this.storage, 'images');

  uploadImage(file: File) {
    if (!file) return;

    const imageRef = ref(this.storageRef, file.name);
    uploadBytesResumable(imageRef, file).on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Upload is complete');
      }
    );
  }
}
