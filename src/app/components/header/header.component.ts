import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  _authService: AuthService;

  constructor(private route: ActivatedRoute, authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pageTitle = data['title'];
    });
  }

  pageTitle: string = '';

  titles: string[] = ['My Original Works', 'Upload a new Work', 'Buy Tokens', 'Actions against plagiarists', 'Account info', 'Billing, Automatic Renewal and Remaining Tokens'];
}
