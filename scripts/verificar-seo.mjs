// Confere se o SEO está pronto para publicar. Roda antes de "npm run build" e "npm start".
//   - site.config.ts > url preenchido, com https:// e sem barra no final
//   - public/robots.txt e public/sitemap.xml sem o marcador SEU-ENDERECO e com o mesmo endereço
// Com url vazio, só avisa (o endereço do site pode ainda não existir).
// No "npm run build", erro de configuração interrompe o build.
// No "npm start" (--dev), tudo vira apenas aviso.

import { existsSync, readFileSync } from 'node:fs';

const MODO_DEV = process.argv.includes('--dev');
const ARQUIVO_CONFIG = 'src/app/dados/site.config.ts';
const ARQUIVOS_SEO = ['public/robots.txt', 'public/sitemap.xml'];
const PLACEHOLDER = 'SEU-ENDERECO';

const erros = [];
const avisos = [];

// Devolve o url do site.config.ts, ou null se não deu para ler (o erro já fica registrado)
function lerUrl() {
  if (!existsSync(ARQUIVO_CONFIG)) {
    erros.push(`${ARQUIVO_CONFIG} não existe. Copie site.config.example.ts (veja o README).`);
    return null;
  }
  const config = readFileSync(ARQUIVO_CONFIG, 'utf8');
  // Âncora no início da linha para não pegar exemplos que estão dentro de comentários.
  // Aceita aspas simples, duplas ou crase, caso o formatador de código troque o estilo.
  const achado = config.match(/^\s*url:\s*(['"`])(.*?)\1/m);
  if (!achado) {
    erros.push("site.config.ts não tem o campo 'url'. Copie-o de site.config.example.ts.");
    return null;
  }
  return achado[2].trim();
}

const url = lerUrl();

if (url === '') {
  avisos.push(
    'site.config.ts > url está vazio. O site vai sem canonical, sem og:url e sem links absolutos de SEO.',
    `public/robots.txt e public/sitemap.xml continuam com ${PLACEHOLDER}.`,
    'Preencha assim que souber o endereço do site (ex.: https://rotaexclusiva.com.br).',
  );
} else if (url !== null) {
  if (!/^https:\/\/[^\s/]+$/.test(url)) {
    erros.push(`site.config.ts > url ("${url}") deve começar com https:// e não ter barra no final.`);
  }
  for (const arquivo of ARQUIVOS_SEO) {
    if (!existsSync(arquivo)) {
      erros.push(`${arquivo} não existe.`);
      continue;
    }
    const texto = readFileSync(arquivo, 'utf8');
    if (texto.includes(PLACEHOLDER)) {
      erros.push(`${arquivo} ainda tem ${PLACEHOLDER}. Troque por ${url}.`);
    } else if (!texto.includes(url)) {
      avisos.push(`${arquivo} não menciona ${url}. Confira se o endereço está igual ao do site.config.ts.`);
    }
  }
}

for (const aviso of avisos) console.warn(`⚠️  SEO: ${aviso}`);

if (erros.length) {
  for (const erro of erros) console.error(`${MODO_DEV ? '⚠️ ' : '❌'} SEO: ${erro}`);
  if (!MODO_DEV) process.exit(1);
} else if (!avisos.length) {
  console.log('SEO: configuração conferida.');
}
