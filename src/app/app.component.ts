import { DialogModule } from '@angular/cdk/dialog';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

// 2. Execute a função para registrar os dados de 'pt'
registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent, NgApexchartsModule, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finance_frontend';
}
