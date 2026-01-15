import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SignUpComponent } from '../sign-up/sign-up.component'
import { HeaderComponent } from '../header/header.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, ButtonModule, RouterModule, CardModule, SignUpComponent, DividerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
