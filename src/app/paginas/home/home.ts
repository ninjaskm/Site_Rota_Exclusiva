import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLANOS, Plano } from '../../dados/planos';
import { IconePlano } from '../../componentes/icone-plano';
import { FaleComigo } from '../../componentes/fale-comigo';
import { FotoSite } from '../../componentes/foto-site';
import { negocioJsonLd, Seo } from '../../utilitarios/seo';
import { SITE } from '../../dados/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconePlano, FaleComigo, FotoSite],
  templateUrl: './home.html',
})
export class Home {
  protected readonly planos: Plano[] = PLANOS;
  protected readonly site = SITE;

  constructor() {
    inject(Seo).atualizar({
      titulo: 'Motorista Particular, Turismo e Chofer em Recife',
      descricao: `${SITE.nome}: motorista particular, passeios privativos de turismo e chofer exclusivo em Recife e Pernambuco. Conforto, pontualidade e discrição. Fale no WhatsApp.`,
      caminho: '/',
      jsonLd: [negocioJsonLd()],
    });
  }
}
