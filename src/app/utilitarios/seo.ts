import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Plano } from '../dados/planos';
import { SITE } from '../dados/site.config';
import { TELEFONE_E164 } from './contato';

// SEO: título, descrição, prévia de compartilhamento (WhatsApp, Instagram) e dados
// estruturados que o Google lê. Cada página chama Seo.atualizar() ao abrir.

// Lugares atendidos, enviados ao Google como área de atuação. Edite se a região mudar.
const AREAS_ATENDIDAS = [
  'Recife',
  'Olinda',
  'Porto de Galinhas',
  'Praia dos Carneiros',
  'Maragogi',
  'João Pessoa',
];

const URL_SITE = SITE.url.replace(/\/+$/, '');
const ID_JSON_LD = 'seo-json-ld';

type JsonLd = Record<string, unknown>;

export interface DadosSeo {
  titulo: string; // sem o nome do site, que é acrescentado aqui
  descricao: string;
  caminho: string; // '/', '/sobre', '/plano/turismo'
  jsonLd: JsonLd[];
  semIndice?: boolean; // true: pede ao Google para não listar a página (ex.: página não encontrada)
}

function absoluta(caminho: string): string {
  return URL_SITE ? `${URL_SITE}${caminho}` : '';
}

// Prévia do link (WhatsApp, redes): 1200x630 gerada por scripts/otimizar-imagens.mjs
function imagemCompartilhamento(): string {
  const temFoto = SITE.fotoPaisagem || SITE.fotoCarro || SITE.fotoPerfil;
  return temFoto ? absoluta('/compartilhamento.jpg') : '';
}

function areasAtendidas(): JsonLd[] {
  return AREAS_ATENDIDAS.map((name) => ({ '@type': 'Place', name }));
}

// O negócio como um todo. Entra em todas as páginas.
export function negocioJsonLd(): JsonLd {
  const imagem = imagemCompartilhamento();
  return {
    '@type': 'LocalBusiness',
    ...(URL_SITE ? { '@id': `${URL_SITE}/#negocio`, url: URL_SITE } : {}),
    name: SITE.nome,
    telephone: TELEFONE_E164,
    areaServed: areasAtendidas(),
    ...(imagem ? { image: imagem } : {}),
  };
}

// Um serviço oferecido (Plano). Entra na página do respectivo plano.
export function planoJsonLd(plano: Plano): JsonLd {
  return {
    '@type': 'Service',
    name: plano.titulo,
    serviceType: plano.seoTitulo,
    description: plano.seoDescricao,
    provider: URL_SITE
      ? { '@id': `${URL_SITE}/#negocio` }
      : { '@type': 'LocalBusiness', name: SITE.nome },
    areaServed: areasAtendidas(),
    ...(URL_SITE ? { url: absoluta(`/plano/${plano.id}`) } : {}),
  };
}

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  atualizar(dados: DadosSeo): void {
    const titulo = `${dados.titulo} | ${SITE.nome}`;
    const url = absoluta(dados.caminho);
    const imagem = imagemCompartilhamento();

    this.title.setTitle(titulo);
    this.definir({ name: 'description' }, dados.descricao);
    this.definir({ name: 'robots' }, dados.semIndice ? 'noindex' : '');

    this.definir({ property: 'og:type' }, 'website');
    this.definir({ property: 'og:locale' }, 'pt_BR');
    this.definir({ property: 'og:site_name' }, SITE.nome);
    this.definir({ property: 'og:title' }, titulo);
    this.definir({ property: 'og:description' }, dados.descricao);
    this.definir({ property: 'og:url' }, url);
    this.definir({ property: 'og:image' }, imagem);

    this.definir({ name: 'twitter:card' }, imagem ? 'summary_large_image' : 'summary');
    this.definir({ name: 'twitter:title' }, titulo);
    this.definir({ name: 'twitter:description' }, dados.descricao);
    this.definir({ name: 'twitter:image' }, imagem);

    this.definirCanonical(url);
    this.definirJsonLd(dados.jsonLd);
  }

  // Cria ou atualiza a meta tag; com valor vazio, remove a tag
  private definir(chave: { name: string } | { property: string }, valor: string): void {
    const [atributo, nome] = Object.entries(chave)[0];
    if (valor) {
      this.meta.updateTag({ ...chave, content: valor } as MetaDefinition);
    } else {
      this.meta.removeTag(`${atributo}="${nome}"`);
    }
  }

  private definirCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!url) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }
    link.href = url;
  }

  private definirJsonLd(grafo: JsonLd[]): void {
    const head = this.document.head;
    head.querySelector(`#${ID_JSON_LD}`)?.remove();
    const script = this.document.createElement('script');
    script.id = ID_JSON_LD;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo });
    head.appendChild(script);
  }
}
