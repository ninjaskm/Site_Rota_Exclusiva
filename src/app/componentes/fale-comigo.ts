import { Component, computed, input } from '@angular/core';
import { Plano } from '../dados/planos';
import { linkGeral, linkPlano } from '../utilitarios/contato';

// Botão "Fale comigo": abre o WhatsApp com a mensagem pronta.
// Uso: <a app-fale-comigo class="btn-ouro" [plano]="plano"></a>
// Sem [plano], a mensagem é a geral. As classes de estilo ficam por conta de quem usa.
@Component({
  selector: 'a[app-fale-comigo]',
  template: `
    <svg class="icone-zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>
    Fale comigo
  `,
  host: {
    '[attr.href]': 'href()',
    target: '_blank',
    rel: 'noopener',
  },
})
export class FaleComigo {
  readonly plano = input<Plano>();

  protected readonly href = computed(() => {
    const plano = this.plano();
    return plano ? linkPlano(plano) : linkGeral();
  });
}
