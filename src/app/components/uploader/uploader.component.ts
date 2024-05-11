import { Component, inject, signal } from '@angular/core';
import { STATES_UPLOAD, StatesUpload } from '../../utils/statesUpload';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'page-uploader',
  standalone: true,
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css',
})
export class UploaderComponent {
  private storage = inject(Storage);
  private storageRef = ref(this.storage, 'images');

  public readonly states = STATES_UPLOAD;
  public currentState = signal<StatesUpload>(this.states.INITIAL);

  public uploadedImage: string | null = null;
  public isdragging = signal(false);
  private maxFileSize = 2 * 1024 * 1024; // 2MB

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (!this.validateFile(file)) return;

    this.uploadImage(file);
  }

  validateFile(file: File) {
    if (file.size > this.maxFileSize) {
      alert('File is too big! Max size is 2MB');
      return false;
    }
    return true;
  }

  async uploadImage(file: File) {
    if (!file) return;

    const imageRef = ref(this.storageRef, file.name);
    console.log('Uploading image...', imageRef.fullPath);

    this.currentState.set(this.states.UPLOADING);

    await uploadBytesResumable(imageRef, file).catch((error) => {
      console.error('Error uploading file', error);
      this.currentState.set(this.states.ERROR);
    });

    const url = await getDownloadURL(imageRef).catch((error) => {
      console.error('Error getting download URL', error);
      this.currentState.set(this.states.ERROR);
    });

    console.log('Image uploaded!', url);

    if (url) {
      this.uploadedImage = url;
      this.currentState.set(this.states.UPLOADED);
    }
  }

  downloadImage() {
    if (!this.uploadedImage) return;
    const a = document.createElement('a');
    a.href = this.uploadedImage;
    a.download = 'image1.jpg';
    a.click();
  }

  shareImage() {
    if (!this.uploadedImage) return;
    navigator.share({
      title: 'Image shared from Angular',
      text: 'Check out this image!',
      url: this.uploadedImage,
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isdragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isdragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isdragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (!file) return;

    if (!this.validateFile(file)) return;

    this.uploadImage(file);
  }
}
