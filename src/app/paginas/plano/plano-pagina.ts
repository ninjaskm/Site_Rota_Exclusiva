import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLANOS } from '../../dados/planos';
import { IconePlano } from '../../componentes/icone-plano';
import { linkPlano, linkServico } from '../../utilitarios/links';
import { SITE } from '../../dados/site.config';
import { TELEFONE, TELEFONE_LINK } from '../../utilitarios/telefone';

@Component({
  selector: 'app-plano-pagina',
  imports: [RouterLink, IconePlano],
  templateUrl: './plano-pagina.html',
})
export class PlanoPagina {
  // Vem da URL: /plano/:id
  readonly id = input<string>();

  protected readonly site = SITE;

  protected readonly telefone = TELEFONE;
  protected readonly telefoneLink = TELEFONE_LINK;
  protected readonly plano = computed(() => PLANOS.find((p) => p.id === this.id()));

  protected readonly linkPlano = linkPlano;
  protected readonly linkServico = linkServico;
}
