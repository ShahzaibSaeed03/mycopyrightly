import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { WorkComponent } from '../work/work.component';
import { WorksService } from '../../services/works.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-original-works',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, InputTextModule, ButtonModule, CalendarModule, WorkComponent, DatePipe],
  providers: [DatePipe],
  templateUrl: './my-original-works.component.html',
  styleUrl: './my-original-works.component.css'
})
export class MyOriginalWorksComponent {

  constructor(private _worksService: WorksService, private datePipe: DatePipe) { }

  worksList: any = [];

  id = new FormControl('');
  title = new FormControl('');
  from = new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
  to = new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));

  submit() {
    // try {
    //   this._worksService.findWorks(
    //     this.id.value ?? undefined,
    //     this.title.value ?? undefined,
    //     this.from.value ?? undefined,
    //     this.to.value ?? undefined)
    //     .subscribe((data) => {
    //       this.worksList = data;
    //     })
    // } catch (e) {
    //   console.log(e);
    // }
  }
}
