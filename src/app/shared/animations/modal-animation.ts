// src/app/animations.ts
import { animate, style, transition, trigger } from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
  // A transição de :enter ocorre quando o modal é aberto
  transition(':enter', [
    // Estado inicial (antes da animação)
    style({
      opacity: 0,
      transform: 'translateY(30px) scale(0.95)', // Começa um pouco para baixo, menor e transparente
    }),
    // Animação para o estado final
    animate(
      '300ms ease-out',
      style({
        opacity: 1,
        transform: 'translateY(0) scale(1)', // Termina na posição normal, no tamanho total e opaco
      })
    ),
  ]),
  // A transição de :leave ocorre quando o modal é fechado
  transition(':leave', [
    // Anima para o estado final (invisível)
    animate(
      '200ms ease-in',
      style({
        opacity: 0,
        transform: 'translateY(30px) scale(0.95)',
      })
    ),
  ]),
]);
