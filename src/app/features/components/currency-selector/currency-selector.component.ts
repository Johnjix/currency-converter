import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FixerService } from '../../../services/fixer.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbTooltipModule, FormsModule],
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
})
export class CurrencySelectorComponent {
  @Input() amount: number;
  @Output() amountChange: EventEmitter<number>;
  @Input() symbol: string;
  @Output() symbolChange: EventEmitter<string>;
  @Input() title: 'Base' | 'Target';

  currencies$: Observable<Record<string, string>>;
  name: string;

  constructor(private _fixerService: FixerService) {
    this.symbol = '';
    this.name = '';
    this.amount = 0;
    this.title = 'Base';
    this.amountChange = new EventEmitter<number>();
    this.symbolChange = new EventEmitter<string>();
    this.currencies$ = this._fixerService.getSupportedSymbols();
  }

  setCurrency(symbol: string, name: string): void {
    this.symbol = symbol;
    this.name = name;

    this.emitSymbol();
  }

  emitAmount(): void {
    this.amountChange.emit(this.amount);
  }
  emitSymbol(): void {
    this.symbolChange.emit(this.symbol);
  }
}
