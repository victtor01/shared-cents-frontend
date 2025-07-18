import { Component } from '@angular/core';
import { MainInstallmentHeaderComponent } from './main-installment-header.component';
import { MainInstallmentPlansComponent } from './main-installments-plans.component';

@Component({
  selector: 'main-installment',
  imports: [MainInstallmentHeaderComponent, MainInstallmentPlansComponent],
  templateUrl: 'main-installment.component.html',
})
export class MainInstallmentComponent {}
