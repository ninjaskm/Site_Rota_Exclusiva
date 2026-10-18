import { Component, computed, input } from '@angular/core';
import imagens from '../dados/imagens.json';

// Foto do site em vários tamanhos e em WebP, gerados por scripts/otimizar-imagens.mjs
// (roda sozinho em "npm start" e "npm run build"). O navegador escolhe o menor que serve.
// Larguras e nome dos arquivos vêm de dados/imagens.json, o mesmo arquivo que o script lê.
// Uso: <img app-foto [arquivo]="site.fotoCarro" sizes="(max-width: 860px) 100vw, 860px" alt="..." />
// Com [prioridade]="true" a foto carrega primeiro (use só na foto principal da página).

@Component({
  selector: 'img[app-foto]',
  template: '',
  host: {
    '[attr.src]': 'arquivo()',
    '[attr.srcset]': 'srcset()',
    '[attr.sizes]': 'sizes()',
    '[attr.loading]': "prioridade() ? 'eager' : 'lazy'",
    '[attr.fetchpriority]': "prioridade() ? 'high' : null",
    decoding: 'async',
  },
})
export class FotoSite {
  readonly arquivo = input.required<string>();
  readonly sizes = input('100vw');
  readonly prioridade = input(false);

  protected readonly srcset = computed(() => {
    const nome = this.arquivo().replace(/\.[^.]+$/, '');
    return imagens.larguras
      .map((largura) => {
        const arquivo = imagens.padrao.replace('{nome}', nome).replace('{largura}', String(largura));
        return `${arquivo} ${largura}w`;
      })
      .join(', ');
  });
}
