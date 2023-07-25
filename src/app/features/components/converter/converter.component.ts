import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ICurrency } from '../../../models/currency.model';
import { Observable } from 'rxjs';
import { FixerService } from '../../../services/fixer.service';
import { ProgressBarMode } from '../../../models/progress-bar-mode.model';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

const modules = [
  CommonModule,
  MatCardModule,
  MatProgressBarModule,
  NgbDropdownModule,
  NgbTooltipModule,
];
const components = [CurrencySelectorComponent, DatePickerComponent];
@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  loading: boolean;
  progressBarMode: ProgressBarMode;
  currencies$: Observable<ICurrency>;
  date: string;
  amountLeft: number;
  symbolLeft: string;
  amountRight: number;
  symbolRight: string;

  constructor(private _fixerService: FixerService) {
    this.loading = false;
    this.progressBarMode = 'determinate';
    this.currencies$ = this._fixerService.getSupportedSymbols();
    this.date = this.getCurrentDate();
    this.amountLeft = 0;
    this.symbolLeft = '';
    this.amountRight = 0;
    this.symbolRight = '';
  }

  ngOnInit(): void {}

  toggleLoading(): void {
    this.loading = !this.loading;
    this.progressBarMode = this.loading ? 'indeterminate' : 'determinate';
  }

  private getCurrentDate(): string {
    const todaysDate: Date = new Date();

    return `${todaysDate.getFullYear()}-${
      todaysDate.getMonth() + 1
    }-${todaysDate.getDate()}`;
  }

  onDateChange(date: string): void {
    this.date = date;
  }

  getCurrencyConversion(
    from: string,
    to: string,
    amount: number,
    date?: string
  ): void {
    console.log(from, to, amount, date);
    if (!from || !to || amount == 0) return;

    this._fixerService
      .getConversion(from, to, amount, undefined)
      .subscribe((conversionResponse) =>
        this.setNewAmount(from, conversionResponse.result)
      );
  }
  private setNewAmount(symbol: string, result: number): void {
    symbol == this.symbolLeft
      ? (this.amountLeft = result)
      : (this.amountRight = result);
  }
}
