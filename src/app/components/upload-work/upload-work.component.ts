import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { WorksService } from '../../services/works.service';
// import { uploadWorkRequest } from '../../models/uploadWorkRequest.model';

@Component({
  selector: 'app-upload-work',
  standalone: true,
  imports: [HeaderComponent, InputTextModule, ReactiveFormsModule, ButtonModule, FileUploadModule,
    CommonModule, FormsModule, ToastModule
  ],
  providers: [MessageService],
  templateUrl: './upload-work.component.html',
  styleUrl: './upload-work.component.css'
})
export class UploadWorkComponent {

  constructor(private messageService: MessageService, private _workService: WorksService) { }

  @ViewChild('fileUploader') fileUploader!: FileUpload;
  maxFileSize = 125829120;
  fileName: string = '';

  title: FormControl = new FormControl('', [Validators.required]);
  ownerName: FormControl = new FormControl('', Validators.required);
  additionalOwner: FormControl = new FormControl('', Validators.required);
  selectedFile: File | null = null;

  fileSelect(event: any) {
    const file = event.files && event.files?.[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'File Too Large',
          detail: `The file ${file.name} exceeds the 120MB limit.`,
        });
        this.fileUploader.clear();
        return;
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.selectedFile = reader.result;
      // };
      // reader.readAsDataURL(file);
      this.selectedFile = file;
      // this.fileName = this.selectedFile?.name || '';
    }
  }

  cancel() {
    this.selectedFile = null;
    this.fileName = '';
    this.fileUploader.clear();
  }

  uploadFile() {
    if (this.selectedFile !== null) {
      this._workService.uploadWork(
        this.title.value,
        this.ownerName.value,
        this.additionalOwner.value,
        this.selectedFile).subscribe(data => console.log(data));
    }
  }
}
