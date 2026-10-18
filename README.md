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
src/app/
  dados/                     o que você edita no dia a dia
    site.config.ts           nome, WhatsApp, fotos, texto do "Sobre mim"
    planos.ts                textos dos três planos e serviços pré-montados
  paginas/                   uma pasta por página do site
    home/                    página inicial (apresentação e cartões)
    plano/                   página de cada plano (Motorista, Turismo, Chofer)
    sobre/                   página "Sobre mim"
  componentes/               peças reutilizadas (ícone dos planos)
  utilitarios/
    links.ts                 monta os links do WhatsApp com a mensagem pronta
  app.html, app.ts           barra de cima (menu) e rodapé
  app.css                    visual de todo o site
  app.routes.ts              lista das páginas e seus endereços
  app.config.ts              configuração geral (rotas)
```

## O que editar

- `src/app/dados/site.config.ts`: nome, número do WhatsApp, fotos e textos do "Sobre mim".
- `src/app/dados/planos.ts`: textos dos três planos e os serviços pré-montados.
- `src/app/utilitarios/links.ts`: frases que aparecem prontas no WhatsApp.
- `src/app/app.css`: cores, tamanhos e espaçamentos de todo o site.
- `src/app/paginas/*/`: o HTML de cada página.
- `public/`: imagens.
