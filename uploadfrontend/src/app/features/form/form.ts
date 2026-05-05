import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, viewChild, ElementRef } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

export interface DocumentData {
  title: string;
  department: string;
  file: File | null;
}

const INITIAL_DOCUMENT_STATE: DocumentData = {
  title: '',
  department: '',
  file: null,
};

@Component({
  selector: 'app-form',
  imports: [FormField, FormRoot],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private httpClient = inject(HttpClient);
  
  // 1. Get reference to the native file input element
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  documentModel = signal<DocumentData>({ ...INITIAL_DOCUMENT_STATE });

  documentForm = form(
    this.documentModel,
    (path) => {
      required(path.title);
      required(path.department);
      required(path.file);
    },
    {
      submission: {
        action: async (formFieldTree) => {
          const data = formFieldTree().value();
          const formData = new FormData();
          
          formData.append('title', data.title);
          formData.append('department', data.department);
          if (data.file) {
            formData.append('file', data.file, data.file.name);
          }

          await firstValueFrom(
            this.httpClient.post('http://localhost:8080/api/upload', formData)
          );

          // 2. Reset the Signal Forms state
          this.documentForm().reset(INITIAL_DOCUMENT_STATE);
          
          // 3. Manually reset the DOM file input
          const inputEl = this.fileInput()?.nativeElement;
          if (inputEl) {
            inputEl.value = '';
          }
        },
      },
    }
  );

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.documentForm.file().value.set(file);
    }
  }
}
