import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { PieGridChartComponent } from "@app/shared/components/pie-grid-chart/pie-grid-chart.component";
import { ToFormatBrlPipe } from "@app/shared/pipes/to-format-brl-pipe/to-format-brl.pipe";

@Component({
	templateUrl: "main-installments-plans.component.html",
	selector: "main-installment-plans",
	imports: [PieGridChartComponent, ToFormatBrlPipe, MatIconModule],
})

export class MainInstallmentPlansComponent {}