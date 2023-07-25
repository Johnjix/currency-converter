import { ICurrency } from './currency.model';

/**
 * Response from https://data.fixer.io/api/symbols?access_key=API_KEY
 */
export interface ICurrencyResponse {
  success: boolean;
  symbols: ICurrency;
}
