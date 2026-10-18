import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLANOS, Plano } from '../../dados/planos';
import { IconePlano } from '../../componentes/icone-plano';
import { SITE } from '../../dados/site.config';
import { linkPlano } from '../../utilitarios/links';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconePlano],
  templateUrl: './home.html',
})
export class Home {
  protected readonly planos: Plano[] = PLANOS;
  protected readonly site = SITE;
  protected readonly linkPlano = linkPlano;
}
