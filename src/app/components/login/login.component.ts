import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ToastModule, InputTextModule, ButtonModule, ReactiveFormsModule, FormsModule,
    PasswordModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private messageService: MessageService, private _authService: AuthService, private router: Router) { }

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);

  submit() {
    if (this.email.invalid || this.password.invalid) {
      this.email.markAsTouched();
      this.password.markAsDirty();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields' });
      return;
    }

    this._authService.login(this.email.value, this.password.value).subscribe({
      next: (data: any) => {
        this._authService.setUser(data);
        this.router.navigate(['/my-original-works'])
        this.messageService.add({ severity: 'success', summary: 'Add', detail: 'login Successfully' });
      },
      error: (err) => {
        if (err.status === 401)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect email or password' });
        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Try again later' });

      }
    });
  }
}
