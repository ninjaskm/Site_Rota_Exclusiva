import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SITE } from './dados/site.config';
import { PLANOS } from './dados/planos';
import { linkGeral } from './utilitarios/links';
import { TELEFONE } from './utilitarios/telefone';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // None: os estilos de app.css valem para o site todo, inclusive as páginas internas
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly site = SITE;
  protected readonly planos = PLANOS;
  protected readonly ano = new Date().getFullYear();
  protected readonly linkGeral = linkGeral;
  protected readonly telefone = TELEFONE;
}
