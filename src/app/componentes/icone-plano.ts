import { Component, input } from '@angular/core';
import { Plano } from '../dados/planos';

@Component({
  selector: 'app-icone-plano',
  template: `
    @switch (tipo()) {
      @case ('motorista') {
        <svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 16l1.4-4.6A2 2 0 0 1 8.3 10h7.4a2 2 0 0 1 1.9 1.4L19 16"/><path d="M3.5 16h17v3h-17z"/><circle cx="7.5" cy="19.5" r="1.4"/><circle cx="16.5" cy="19.5" r="1.4"/></svg>
      }
      @case ('turismo') {
        <svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>
      }
      @case ('chofer') {
        <svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.4-2.9 8.2-7 10-4.1-1.8-7-5.6-7-10V6z"/><path d="M9 12l2.2 2.2L15.5 10"/></svg>
      }
    }
  `,
})
export class IconePlano {
  readonly tipo = input.required<Plano['id']>();
}
