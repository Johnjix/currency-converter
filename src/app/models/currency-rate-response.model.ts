import { ICurrencyRate } from './currency-rate.model';

export interface ICurrencyRateResponse {
  success: boolean;
  historical: boolean;
  date: string;
  timestamp: number;
  base: string;
  rates: ICurrencyRate;
}
