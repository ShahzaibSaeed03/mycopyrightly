import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { AppService } from './services/app.service';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    RouterModule,
    CardModule,
    SignUpComponent,
    PanelMenuModule,
    TieredMenuModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MyCopyRightAlly';

  _authService: AuthService;
  private userSubscription: Subscription = new Subscription();
  private footerTextSubscription: Subscription = new Subscription();
  constructor(private _appService: AppService, authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit() {
    this.footerTextSubscription = this._appService
      .getFooterStrings()
      .subscribe({
        next: (data: any) => {
          this.footerTexts = data
        },
        error: (error: { message: any; }) => {
          console.error("Error loading text for footer,", error);
        }
      })

    this.userSubscription = this._authService.user$.subscribe((user) => {
      if (user) {
        this.items = [
          {
            label: 'My Account', styleClass: 'highlight', routerLink: ['/my-original-works'], items: [
              { label: 'My Original works', routerLink: ['/my-original-works'] },
              { label: 'Upload a new work', routerLink: ['/upload-work'] },
              { label: 'Buy tokens', routerLink: ['/buy-tokens'] },
              { label: 'Actions against plagiarists', routerLink: ['/actions-against-plagiarists'] },
              { label: 'Account info', routerLink: ['/signup'] },
              { label: 'Billing, Automatic Renewal and Remaining Tokens', routerLink: ['/signup'] },
            ]
          },
          { label: 'Highlights', routerLink: ['/highlights'] },
          { label: 'Pricing', routerLink: ['/pricing'] },
          { label: 'Show a registered work', routerLink: ['/signup'] },
          { label: 'Verify a registration', routerLink: ['/signup'] },
          { label: 'FAQ', routerLink: ['/faq'] },
          { label: 'Contact Us', routerLink: ['/contact-us'] }
        ];
      } else {
        this.items = [
          { label: 'Highlights', routerLink: ['/highlights'] },
          { label: 'Pricing', routerLink: ['/pricing'] },
          { label: 'Show a registered work', routerLink: ['/signup'] },
          { label: 'Verify a registration', routerLink: ['/signup'] },
          { label: 'FAQ', routerLink: ['/faq'] },
          { label: 'Contect Us', routerLink: ['/contact-us'] }
        ];
      }

    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.footerTextSubscription.unsubscribe();
  }

  footerTexts: any = {};
  items: MenuItem[] = [
    { label: 'Highlights', routerLink: ['/highlights'] },
    { label: 'Pricing', routerLink: ['/pricing'] },
    { label: 'Show aregistered work', routerLink: ['/signup'] },
    { label: 'Verify a registration', routerLink: ['/signup'] },
    { label: 'FAQ', routerLink: ['/faq'] },
    { label: 'Contect Us', routerLink: ['/contact-us'] }
  ];
}
