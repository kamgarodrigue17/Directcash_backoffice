import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

export class DateTime {
  date!: string
  time!: string
}

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor(
    private _datePipe: DatePipe
  ) { }

  /**
   * Format date to string 
   * @param date 
   * @returns 
   */
  formatDate(date: Date): DateTime {

    // date section
    const day = this._datePipe.transform(date, 'EEE'); // Day of the week, abbreviated
    const dayNumber = this._datePipe.transform(date, 'dd'); // Day of the month, two digits
    const month = this._datePipe.transform(date, 'MMM'); // Month, abbreviated
    const year = this._datePipe.transform(date, 'yyyy'); // Year, full

    // time section
    const time = this._datePipe.transform(date, 'HH:mm'); // Hours and minutes

    let datetime = new DateTime();
    datetime.date = `${day}. ${dayNumber} ${month} ${year}`;
    datetime.time = time + ``;

    return datetime;
  }

  getFormatedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}