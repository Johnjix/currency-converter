import { IConversionInfo } from './conversion-info.model';
import { IConversionQuery } from './conversion-query.model';

/**
 * Response from https://data.fixer.io/api/convert
    ? access_key = API_KEY
    & from = GBP
    & to = JPY
    & amount = 25
 */
export interface IConversionResponse {
  success: boolean;
  query: IConversionQuery;
  info: IConversionInfo;
  historical: boolean;
  date: string;
  result: number;
}
