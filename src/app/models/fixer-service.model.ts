import { Observable } from 'rxjs';
import { ICurrencyRateResponse } from './currency-rate-response.model';
import { IConversionResponse } from './conversion-reponse.model';

export interface IFixerService {
  /**
   * @returns all available currency symboles
   * 
   * @example "symbols": {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    [...]
    }
   */
  getSupportedSymbols(): Observable<Record<string, string>>;

  /**
   * 
   * @param date Date of the rate.
   * @param baseCurrency Base currency symbol.
   * @param symbols target currency symbols, comma separated.
   * 
   * @example 
   * {
      "success": true,
      "historical": true,
      "date": "2013-12-24",
      "timestamp": 1387929599,
      "base": "GBP",
      "rates": {
          "USD": 1.636492,
          "EUR": 1.196476,
          "CAD": 1.739516
      }
    }
   */
  getHistoricalRates(
    date: string,
    baseCurrency: string,
    symbols: string
  ): Observable<ICurrencyRateResponse>;

  /**
   * 
   * @param from base currency i.e. GBP
   * @param to target currency i.e. JPY
   * @param amount number to convert
   * @param date? Optional date to get historical conversion rate
   * 
   * @example  {
    "success": true,
    "query": {
        "from": "GBP",
        "to": "JPY",
        "amount": 25
    },
    "info": {
        "timestamp": 1519328414,
        "rate": 148.972231
    },
    "historical": ""
    "date": "2018-02-22"
    "result": 3724.305775
}
   */
  getConversion(
    from: string,
    to: string,
    amount: number,
    date?: string
  ): Observable<IConversionResponse>;
}
