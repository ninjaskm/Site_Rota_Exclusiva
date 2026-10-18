import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SITE } from './dados/site.config';
import { PLANOS } from './dados/planos';
import { linkGeral, TELEFONE } from './utilitarios/contato';
import { FotoSite } from './componentes/foto-site';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FotoSite],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // None: os estilos de app.css valem para o site todo, inclusive as páginas internas
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly site = SITE;
  protected readonly planos = PLANOS;
  protected readonly rodapeServicos = PLANOS.map((plano) => plano.titulo).join(' · ');
  protected readonly ano = new Date().getFullYear();
  protected readonly linkGeral = linkGeral;
  protected readonly telefone = TELEFONE;
}
