import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGridChartComponent } from './pie-grid-chart.component';

describe('PieGridChartComponent', () => {
  let component: PieGridChartComponent;
  let fixture: ComponentFixture<PieGridChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieGridChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieGridChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
