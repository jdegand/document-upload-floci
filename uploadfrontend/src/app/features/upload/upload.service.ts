import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
    private http = inject(HttpClient);

    uploadDocument(file: File, title: string, department: string): Observable<unknown> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('department', department);

        return this.http.post('http://localhost:8080/api/upload', formData);
    }
}
