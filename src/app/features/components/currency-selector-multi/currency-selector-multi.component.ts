import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FixerService } from '../../../services/fixer.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-currency-selector-multi',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, NgbDropdownModule],
  templateUrl: './currency-selector-multi.component.html',
  styleUrls: ['./currency-selector-multi.component.scss'],
})
export class CurrencySelectorMultiComponent implements OnInit {
  @Input() symbols: string;
  @Output() symbolsChange: EventEmitter<string>;

  currenciesAvailable: Record<string, string>;

  currenciesSelectable: Record<string, boolean>;

  constructor(private _fixerService: FixerService) {
    this.symbols = '';
    this.symbolsChange = new EventEmitter<string>();
    this.currenciesAvailable = {};
    this.currenciesSelectable = {};
  }

  ngOnInit(): void {
    this.getAvailableCurrencies();
  }

  private getAvailableCurrencies(): void {
    this._fixerService
      .getSupportedSymbols()
      .pipe(
        map((availableCurrencies) =>
          this.convertAvailableCurrenciesToSelectable(availableCurrencies)
        )
      )
      .subscribe((symbolsResponse) => {
        this.currenciesSelectable = symbolsResponse;
      });
  }

  private convertAvailableCurrenciesToSelectable(
    availableCurrencies: Record<string, string>
  ): Record<string, boolean> {
    const selectableCurrencies: Record<string, boolean> = Object.keys(
      availableCurrencies
    ).reduce((obj, key) => {
      obj[key] = false;
      return obj;
    }, {} as Record<string, boolean>);

    return selectableCurrencies;
  }

  emitSelectedAsSymbols(): void {
    const selectedSymbols: string =
      this.filterAllSelectedAndReturnAsCommaString();

    this.symbolsChange.emit(selectedSymbols);
  }

  private filterAllSelectedAndReturnAsCommaString(): string {
    return Object.keys(this.currenciesSelectable)
      .filter((key) => this.currenciesSelectable[key])
      .join(',');
  }
}
