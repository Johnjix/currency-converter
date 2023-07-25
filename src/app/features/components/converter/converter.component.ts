import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ICurrency } from '../../../models/currency.model';
import { Observable, Subscription } from 'rxjs';
import { FixerService } from '../../../services/fixer.service';
import { ProgressBarMode } from '../../../models/progress-bar-mode.model';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { LoadingService } from 'src/app/services/loading.service';

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
export class ConverterComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  progressBarMode: ProgressBarMode;
  currencies$: Observable<ICurrency>;
  date: string;
  amountLeft: number;
  symbolLeft: string;
  amountRight: number;
  symbolRight: string;
  sub: Subscription;

  constructor(
    private _fixerService: FixerService,
    private _loadingService: LoadingService
  ) {
    this.loading$ = this._loadingService.getLoading();
    this.progressBarMode = 'determinate';
    this.currencies$ = this._fixerService.getSupportedSymbols();
    this.date = this.getCurrentDate();
    this.amountLeft = 0;
    this.symbolLeft = '';
    this.amountRight = 0;
    this.symbolRight = '';
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    this.loadingStatusInit();
  }
  ngOnDestroy(): void {
    // Unsubscribe from observable to prevent memory leak
    this.sub.unsubscribe();
  }

  private getCurrentDate(): string {
    const todaysDate: Date = new Date();

    return `${todaysDate.getFullYear()}-${
      todaysDate.getMonth() + 1
    }-${todaysDate.getDate()}`;
  }
  private loadingStatusInit(): void {
    this.sub = this.loading$.subscribe((loadingStatus) => {
      loadingStatus
        ? (this.progressBarMode = 'indeterminate')
        : (this.progressBarMode = 'determinate');

      console.log('loading', loadingStatus);
    });
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
    if (!from || !to || amount == 0) return;

    this._fixerService
      .getConversion(from, to, amount, date)
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
