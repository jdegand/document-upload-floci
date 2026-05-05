import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.css'],
})
export class Upload {
  title = '';
  department = '';
  file: File | null = null;
  message = '';

  private uploadService = inject(UploadService);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.file = null;
      return;
    }
    this.file = input.files[0];
  }

  onSubmit() {
    if (!this.file) return;

    this.uploadService.uploadDocument(this.file, this.title, this.department)
      .subscribe({
        next: () => this.message = 'Upload successful',
        error: () => this.message = 'Upload failed'
      });
  }

}

