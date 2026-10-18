import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../dados/site.config';
import { FaleComigo } from '../../componentes/fale-comigo';
import { FotoSite } from '../../componentes/foto-site';
import { negocioJsonLd, Seo } from '../../utilitarios/seo';

@Component({
  selector: 'app-sobre',
  imports: [RouterLink, FaleComigo, FotoSite],
  templateUrl: './sobre.html',
})
export class Sobre {
  protected readonly site = SITE;

  constructor() {
    inject(Seo).atualizar({
      titulo: 'Sobre: Transporte e Turismo Privativo em Recife',
      descricao: `Conheça ${SITE.nome}: atendimento pessoal, conforto e passeios privativos em Recife, Pernambuco e no Nordeste. Fale pelo WhatsApp.`,
      caminho: '/sobre',
      jsonLd: [negocioJsonLd()],
    });
  }
}
