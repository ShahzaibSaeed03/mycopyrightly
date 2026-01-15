import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, InputTextModule, FloatLabelModule, InputTextareaModule,
    ButtonModule, ToastModule, DividerModule
  ],
  providers: [MessageService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContectUsComponent {

  constructor(private messageService: MessageService) { }


  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  submit(){    
    if (this.contactForm.invalid) {
      // this.contactForm.markAsDirty();
      this.contactForm.get('name')?.markAsDirty();
      this.contactForm.get('email')?.markAsDirty();
      this.contactForm.get('subject')?.markAsDirty();
      this.contactForm.get('message')?.markAsDirty();
      this.messageService.add({severity:'error', summary:'Error', detail:'Please fill in all required fields'}); 
      return;
    }
  }
}
