import { Component, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-pie-grid-chart',
  imports: [NgxChartsModule, NgApexchartsModule],
  templateUrl: './pie-grid-chart.component.html',
  styleUrl: './pie-grid-chart.component.scss',
})
export class PieGridChartComponent {
  @ViewChild('chart') chart?: ChartComponent;

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [50],
      chart: {
        height: 90,
        type: 'radialBar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '50%',
            background: 'var(--chart-hollow-background)',
          },
          track: {
            background: 'var(--chart-track-background)',
            strokeWidth: '67%',
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -5,
              show: false,
              color: '#888',
              fontSize: '1rem',
            },
            value: {
              formatter: (val) => parseInt(val.toString()).toString() + "%",
              color: 'var(--chart-value-text-color)',
              fontSize: '1rem',
              offsetY: 5,
              fontFamily: "arial",
              fontWeight: 600,
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: [
            'var(--chart-gradient-color-1)',
            'var(--chart-gradient-color-2)',
          ],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Porcento'],
    };
  }
}
