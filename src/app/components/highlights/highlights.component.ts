import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css'
})
export class HighlightsComponent {

}
