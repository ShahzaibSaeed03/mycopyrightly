import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FaqService } from '../../services/faq.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, HeaderComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent implements OnInit {

  faqContent: any;
  data$!: Observable<any>;
  constructor(private _faqService: FaqService) { }
//make functions asyncronous
  async ngOnInit() {
    this.data$ = this._faqService.getFaqContent();
    // this.faqContent = await this._faqService.getFaqContent().subscribe(data => data)
    // console.log(this.faqContent[0]);
    
    // this.faqContent = [
    //   {
    //     name: 'General questions',
    //     questions: [
    //       { question: 'Header I', answer: 'Lorem ipsum dolor sit amet...' },
    //       { question: 'Header II', answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...' },
    //       { question: 'Header III', answer: 'At vero eos et accusamus et iusto odio dignissimos...' }
    //     ]
    //   },
    //   {
    //     name: 'Technical Support',
    //     questions: [
    //       { question: 'How to reset password?', answer: 'You can reset your password by going to the settings page...' },
    //       { question: 'System requirements', answer: 'Our application requires at least 4GB of RAM and a modern browser...' }
    //     ]
    //   }
    // ];
  }

}
