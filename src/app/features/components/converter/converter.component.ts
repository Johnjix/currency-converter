import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, Subscription, delay } from 'rxjs';
import { FixerService } from '../../../services/fixer.service';
import { ProgressBarMode } from '../../../models/progress-bar-mode.model';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { LoadingService } from 'src/app/services/loading.service';
import { CurrencySelectorMultiComponent } from '../currency-selector-multi/currency-selector-multi.component';

const modules = [
  CommonModule,
  MatCardModule,
  MatProgressBarModule,
  NgbDropdownModule,
  NgbTooltipModule,
];
const components = [
  CurrencySelectorComponent,
  DatePickerComponent,
  CurrencySelectorMultiComponent,
];
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
  date: string;
  baseAmount: number;
  baseSymbol: string;
  sub: Subscription;
  rates: Record<string, number>;
  symbols: string;

  constructor(
    private _fixerService: FixerService,
    private _loadingService: LoadingService
  ) {
    this.loading$ = this._loadingService.getLoading();
    this.progressBarMode = 'determinate';
    this.rates = {};
    this.date = this.getCurrentDate();
    this.baseAmount = 0;
    this.baseSymbol = '';
    this.symbols = '';
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
      todaysDate.getMonth() + 1 // January = 0
    }-${todaysDate.getDate()}`;
  }
  private loadingStatusInit(): void {
    this.sub = this.loading$.subscribe((loadingStatus) => {
      loadingStatus
        ? (this.progressBarMode = 'indeterminate')
        : (this.progressBarMode = 'determinate');
    });
  }

  onDateChange(date: string): void {
    this.date = date;
  }

  getConersionRates(): void {
    this._fixerService
      .getHistoricalRates(this.date, this.baseSymbol, this.symbols)
      .subscribe((ratesResponse) => {
        this.rates = ratesResponse.rates;

        console.log('rates', this.rates);
      });
  }
}
