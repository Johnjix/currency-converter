import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

/**
 *
 * @param date Bootstrap date
 * @returns string date in format yyyy-MM-dd
 */
export function getDateStr(date: NgbDate): string {
  return `${date.year}-${date.month}-${date.day}`;
}
