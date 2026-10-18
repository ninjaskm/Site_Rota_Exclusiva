import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLANOS } from '../../dados/planos';
import { IconePlano } from '../../componentes/icone-plano';
import { FaleComigo } from '../../componentes/fale-comigo';
import { FotoSite } from '../../componentes/foto-site';
import { linkServico, TELEFONE, TELEFONE_LINK } from '../../utilitarios/contato';
import { negocioJsonLd, planoJsonLd, Seo } from '../../utilitarios/seo';
import { SITE } from '../../dados/site.config';

@Component({
  selector: 'app-plano-pagina',
  imports: [RouterLink, IconePlano, FaleComigo, FotoSite],
  templateUrl: './plano-pagina.html',
})
export class PlanoPagina {
  // Vem da URL: /plano/:id
  readonly id = input<string>();

  protected readonly site = SITE;
  protected readonly plano = computed(() => PLANOS.find((p) => p.id === this.id()));

  protected readonly telefone = TELEFONE;
  protected readonly telefoneLink = TELEFONE_LINK;
  protected readonly linkServico = linkServico;

  private readonly seo = inject(Seo);

  constructor() {
    effect(() => {
      const plano = this.plano();
      if (plano) {
        this.seo.atualizar({
          titulo: plano.seoTitulo,
          descricao: plano.seoDescricao,
          caminho: `/plano/${plano.id}`,
          jsonLd: [negocioJsonLd(), planoJsonLd(plano)],
        });
      } else {
        this.seo.atualizar({
          titulo: 'Página não encontrada',
          descricao: 'Esta página não existe.',
          caminho: '/',
          jsonLd: [],
          semIndice: true,
        });
      }
    });
  }
}
