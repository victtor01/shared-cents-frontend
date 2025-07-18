import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'header-date-details',
  templateUrl: './header-date-details.component.html',
  imports: [MatIcon, CommonModule],
})
export class HeaderDateDetais {
  private readonly _date;

  get date() {
    return this._date;
  }

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
    this._date = this.route.snapshot.paramMap.get('date');
  }

  public back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
