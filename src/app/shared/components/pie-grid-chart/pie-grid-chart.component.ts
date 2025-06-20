import { Component } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-grid-chart',
  imports: [NgxChartsModule],
  templateUrl: './pie-grid-chart.component.html',
  styleUrl: './pie-grid-chart.component.scss',
})
export class PieGridChartComponent {
  public percentual = 75;
  public position: LegendPosition = LegendPosition.Below;
  public dadosDoGauge = [{ name: 'Uso', value: this.percentual }];

  public corDoGauge: Color = {
    name: "",
    selectable: false,
    group: ScaleType.Ordinal,
    domain: ['#3b82f6'] // Azul
  };
}
