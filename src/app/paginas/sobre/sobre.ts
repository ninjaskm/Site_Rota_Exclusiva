import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../dados/site.config';
import { linkGeral } from '../../utilitarios/links';

@Component({
  selector: 'app-sobre',
  imports: [RouterLink],
  templateUrl: './sobre.html',
})
export class Sobre {
  protected readonly site = SITE;
  protected readonly linkGeral = linkGeral;
}
