import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  private month: number;
  private year: number;
  private isCurrentMonthDisplayed: boolean;
  private currentDay: number;

  private weeks;

  constructor(private calendarSessionService: CalendarSessionService, private router: Router) {
  }

  ngOnInit() {
    this.currentDay = this.calendarSessionService.CurrentDate.getDate();
    this.loadData();
  }

  loadData() {
    this.calendarSessionService.passedDate$.subscribe(
      (passedDate: Date) => {
        this.month = passedDate.getMonth();
        this.year = passedDate.getFullYear();
        this.isCurrentMonthDisplayed = this.calendarSessionService.IsCurrentMonthDisplayed;
        const noOfDaysInMonth = this.calendarSessionService.GetNumberOfDaysInMonth();
        this.getWeeksOfMonthGrid(noOfDaysInMonth);
      }
    );
  }

  getWeeksOfMonthGrid(daysInMonth: number) {
    this.weeks = [];
    const firstDayOfMonth = this.getFirstDayOfMonth(this.year, this.month);

    for (let i = 0, k = 1; i <= 5; i++) {
      this.weeks.push([]);
      for (let j = 1; j <= 7; j++ , k++) {
        if (k > firstDayOfMonth && k <= firstDayOfMonth + daysInMonth) {
          this.weeks[i].push({
            day: (k - firstDayOfMonth),
            isCurrentDay: this.isCurrentMonthDisplayed && (k - firstDayOfMonth) === this.currentDay
          });
        } else {
          this.weeks[i].push({
            day: '',
            differentMonth: true
          });
        }
      }
    }
  }

  getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  GoToDay(day: number) {
    this.calendarSessionService.PassedDay = day;
    this.calendarSessionService.SetCurrentDisplay('D');
  }
}

