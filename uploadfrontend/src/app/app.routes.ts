import { Routes } from '@angular/router';
import { Upload } from './features/upload/upload';
import { Form } from './features/form/form';

export const routes: Routes = [
    { path: '', component: Form },
    { path: 'old-upload', component: Upload },
];
