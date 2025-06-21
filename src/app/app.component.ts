import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent, NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finance_frontend';
}
