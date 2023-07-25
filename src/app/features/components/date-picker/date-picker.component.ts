import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDate,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { getDateStr } from '../../utilities/get-date-string-from-ngbdate';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule, NgbTooltipModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output() dateChange: EventEmitter<string>;
  date: NgbDateStruct;

  constructor() {
    this.date = this.getTodaysDate();
    this.dateChange = new EventEmitter<string>();
  }

  private getTodaysDate(): NgbDateStruct {
    const todaysDate: Date = new Date();

    return {
      year: todaysDate.getFullYear(),
      month: todaysDate.getMonth() + 1, // +1 because it starts at 0
      day: todaysDate.getDate(),
    };
  }

  emitDate(date: NgbDate): void {
    this.dateChange.emit(getDateStr(date));
  }
}
