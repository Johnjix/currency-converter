import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICurrencyResponse } from '../models/currency-response.model';
import { HttpClient } from '@angular/common/http';
import { ICurrency } from '../models/currency.model';
import { IFixerService } from '../models/fixer-service.model';
import { ICurrencyRateResponse } from '../models/currency-rate-response.model';
import { IConversionResponse } from '../models/conversion-reponse.model';

/**
 * Provides methods for interacting with Fixer API.
 * https://data.fixer.io/api/
 */
@Injectable({
  providedIn: 'root',
})
export class FixerService implements IFixerService {
  private readonly API_KEY: string;
  private readonly baseUrl: string;

  constructor(private _httpService: HttpClient) {
    this.API_KEY = '';
    this.API_KEY = 'e7cb73c4a8b915c7502c01700ece691f';
    this.baseUrl = 'http://data.fixer.io/api/';
  }

  getSupportedSymbols(): Observable<ICurrency> {
    const apiUrl = `${this.baseUrl}symbols?access_key=${this.API_KEY}`;

    return this._httpService
      .get<ICurrencyResponse>(apiUrl)
      .pipe(map((response) => response.symbols));
  }

  getHistoricalRates(
    date: string,
    baseCurrency: string,
    targetCurrency: string
  ): Observable<ICurrencyRateResponse> {
    const apiUrl = `${this.baseUrl}${date}?access_key=${this.API_KEY}&base=${baseCurrency}&symbols=${targetCurrency}`;

    return this._httpService.get<ICurrencyRateResponse>(apiUrl);
  }

  getConversion(
    from: string,
    to: string,
    amount: number,
    date?: string
  ): Observable<IConversionResponse> {
    const apiUrl =
      `${this.baseUrl}convert?access_key=${this.API_KEY}&from=${from}&to=${to}&amount=${amount}` +
      (date ? 'date=' + date : '');

    return this._httpService.get<IConversionResponse>(apiUrl);
  }
}
