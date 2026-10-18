# SiteMamaeUber

Site em Angular (TypeScript) da Rota Exclusiva: página inicial com três serviços (motorista particular, turismo e chofer), uma página para cada serviço e a página "Sobre mim".
Os botões "Fale comigo" abrem o WhatsApp, onde o cliente combina o valor.

## Como rodar

Requer Node.js 20.19 ou superior.

```bash
npm install
```

O arquivo com os dados reais (`site.config.ts`) e as fotos não ficam no GitHub. Antes de rodar, crie a sua configuração a partir do modelo:

```powershell
Copy-Item src/app/dados/site.config.example.ts src/app/dados/site.config.ts
```

Edite o `site.config.ts` com o seu nome e WhatsApp, coloque as fotos em `public/` e rode:

```bash
npm start
```

Abra http://localhost:4200.

Para gerar a versão final: `npm run build` (arquivos em `dist/site-mamae-uber/browser`).

## Onde fica cada coisa

```
public/                      imagens do site (perfil.jpg, carro.jpeg)
scripts/                     otimizar-imagens.mjs (gera os WebP) e verificar-seo.mjs (confere o SEO)
src/app/
  dados/                     o que você edita no dia a dia
    site.config.ts           nome, WhatsApp, fotos, texto do "Sobre mim"
    planos.ts                textos dos três planos e serviços pré-montados
    imagens.json             larguras e nome dos WebP (lido pelo script e pelo componente de foto)
  paginas/                   uma pasta por página do site
    home/                    página inicial (apresentação e cartões)
    plano/                   página de cada plano (Motorista, Turismo, Chofer)
    sobre/                   página "Sobre mim"
  componentes/               peças reutilizadas (ícone do plano e botão "Fale comigo")
  utilitarios/
    contato.ts               telefone e links do WhatsApp com a mensagem pronta
  app.html, app.ts           barra de cima (menu) e rodapé
  app.css                    visual de todo o site
  app.routes.ts              lista das páginas e seus endereços
  app.config.ts              configuração geral (rotas)
```

## O que editar

- `src/app/dados/site.config.ts`: nome, número do WhatsApp, fotos e textos do "Sobre mim".
- `src/app/dados/planos.ts`: textos dos três planos e os serviços pré-montados.
- `src/app/utilitarios/contato.ts`: frases que aparecem prontas no WhatsApp.
- `src/app/app.css`: cores, tamanhos e espaçamentos de todo o site.
- `src/app/paginas/*/`: o HTML de cada página.
- `public/`: imagens.

## SEO (aparecer no Google)

- `site.config.ts > url`: endereço do site no ar. Preencha assim que souber (ex.: `https://rotaexclusiva.com.br`). Troque o mesmo endereço em `public/robots.txt` e `public/sitemap.xml` (procure por `SEU-ENDERECO`).
- `npm start` e `npm run build` rodam `scripts/verificar-seo.mjs`. Com `url` vazio, ele só avisa. Com `url` preenchido, o `npm run build` falha se o endereço não começar com `https://`, se tiver barra no final, ou se `robots.txt` e `sitemap.xml` ainda tiverem `SEU-ENDERECO`. No `npm start` tudo vira apenas aviso.
- `planos.ts > seoTitulo / seoDescricao`: título e descrição de cada plano no Google.
- `utilitarios/seo.ts`: monta título, prévia de compartilhamento e dados estruturados de cada página. Ali também fica a lista de cidades atendidas (`AREAS_ATENDIDAS`).
- Depois de publicar: cadastre o site no Google Search Console e envie o `sitemap.xml`.
- Endereços limpos (`/plano/turismo`, sem `#`): a hospedagem precisa devolver o `index.html` nesses caminhos. A Vercel está coberta pelo `vercel.json` e a Netlify pelo `public/_redirects`.

## Imagens

Coloque só as fotos originais em `public/`. O comando `npm start` e o `npm run build` rodam `scripts/otimizar-imagens.mjs`, que gera sozinho versões em WebP (480, 960 e 1600 px) e a imagem `compartilhamento.jpg` da prévia do WhatsApp. O componente `componentes/foto-site.ts` entrega ao navegador o tamanho certo para cada tela. As larguras e o padrão do nome dos arquivos ficam só em `src/app/dados/imagens.json`, lido tanto pelo script quanto pelo componente: para mudar os tamanhos, edite apenas esse arquivo. Requer `npm install` (instala o `sharp`).

## Publicar na Vercel

O deploy sai da sua máquina, sem passar pelo GitHub: `site.config.ts` e as fotos estão no `.gitignore`, então o build precisa rodar onde eles existem. O `vercel.json` já traz o comando de build, a pasta de saída e as rotas, e desliga deploys automáticos pelo Git.

Uma vez só:

```bash
npm install -g vercel
vercel login
vercel link        # cria o projeto; se perguntar se quer conectar o GitHub, responda não
vercel pull --yes --environment=production
```

A cada publicação:

```bash
npm run deploy
```

O `npm run deploy` faz o build aqui (`vercel build --prod`, que roda o `npm run build` com as imagens e a checagem de SEO) e envia só o resultado pronto (`vercel deploy --prebuilt --prod`). Com `url` vazio, o aviso de SEO aparece, mas não impede o deploy. Quando tiver o domínio definitivo, preencha `site.config.ts > url`, `public/robots.txt` e `public/sitemap.xml` antes de publicar.
