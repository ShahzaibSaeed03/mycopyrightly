import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-actions-against-plagiarists',
  standalone: true,
  imports: [HeaderComponent, CardModule, AccordionModule, DividerModule, AvatarModule],
  templateUrl: './actions-against-plagiarists.component.html',
  styleUrl: './actions-against-plagiarists.component.css'
})
export class ActionsAgainstPlagiaristsComponent {

}
