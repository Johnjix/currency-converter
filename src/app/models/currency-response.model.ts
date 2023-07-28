/**
 * Response from https://data.fixer.io/api/symbols?access_key=API_KEY
 */
export interface ICurrencyResponse {
  success: boolean;
  symbols: Record<string, string>;
}
