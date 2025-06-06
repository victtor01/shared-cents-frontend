import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'selecting-dialog',
  imports: [MatProgressSpinnerModule],
  template: ` <div class="p-8 flex flex-col items-center gap-4 saira-font">
    <div class="loader"></div>

    <h2 mat-dialog-title class="text-xl font-semibold text-gray-700 m-0">
      Selecionando Espaço de Trabalho...
    </h2>

    <div mat-dialog-content class="text-gray-500">
      <p>Aguarde um instante, estamos preparando tudo para você.</p>
    </div>
  </div>`,
})
export class SelectingDialogComponent {}
