// Gera as versões otimizadas das fotos de public/ (perfil, carro e paisagem):
//   <nome>-<largura>.webp para cada largura de imagens.json -> usadas pelo componente FotoSite
//   compartilhamento.jpg (1200x630)                      -> prévia do link no WhatsApp e redes
// Roda sozinho antes de "npm start" e "npm run build". Só refaz o que mudou.
// As fotos originais continuam em public/ e não são alteradas.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('A biblioteca "sharp" não está instalada. Rode: npm install');
  process.exit(1);
}

const PASTA = 'public';
const NOMES = ['perfil', 'carro', 'paisagem'];
const ORIGINAL = /\.(jpe?g|png)$/i;
// Larguras e nome dos arquivos: um único lugar, lido também pelo componente FotoSite
const { larguras: LARGURAS, padrao: PADRAO_ARQUIVO } = JSON.parse(
  readFileSync('src/app/dados/imagens.json', 'utf8'),
);
if (
  !Array.isArray(LARGURAS) ||
  !LARGURAS.length ||
  !LARGURAS.every((n) => Number.isInteger(n) && n > 0) ||
  typeof PADRAO_ARQUIVO !== 'string' ||
  !PADRAO_ARQUIVO.includes('{nome}') ||
  !PADRAO_ARQUIVO.includes('{largura}')
) {
  console.error(
    'imagens.json inválido: precisa de "larguras" (lista de números) e "padrao" com {nome} e {largura}.',
  );
  process.exit(1);
}
// Qualidade do WebP: 78 reduz bastante o peso sem diferença visível
const QUALIDADE = 78;

const arquivos = readdirSync(PASTA);

function acharOriginal(nome) {
  return arquivos.find((f) => f.startsWith(`${nome}.`) && ORIGINAL.test(f));
}

function precisaGerar(origem, destino) {
  return !existsSync(destino) || statSync(destino).mtimeMs < statSync(origem).mtimeMs;
}

let gerados = 0;

for (const nome of NOMES) {
  const arquivo = acharOriginal(nome);
  if (!arquivo) continue;
  const origem = path.join(PASTA, arquivo);

  for (const largura of LARGURAS) {
    const destino = path.join(
      PASTA,
      PADRAO_ARQUIVO.replace('{nome}', nome).replace('{largura}', String(largura)),
    );
    if (!precisaGerar(origem, destino)) continue;
    // withoutEnlargement: foto menor que a largura não é esticada
    await sharp(origem)
      .rotate() // respeita a orientação gravada pelo celular
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: QUALIDADE })
      .toFile(destino);
    gerados++;
  }
}

// Imagem da prévia de compartilhamento: paisagem, senão carro, senão perfil
const fonteCompartilhamento = ['paisagem', 'carro', 'perfil'].map(acharOriginal).find(Boolean);
if (fonteCompartilhamento) {
  const origem = path.join(PASTA, fonteCompartilhamento);
  const destino = path.join(PASTA, 'compartilhamento.jpg');
  if (precisaGerar(origem, destino)) {
    await sharp(origem)
      .rotate()
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(destino);
    gerados++;
  }
}

// Ícone da aba: favicon.svg (desenhado à mão) vira PNG para navegadores sem suporte a SVG,
// para o Google (resultados de busca) e para a tela inicial do iPhone
const icone = path.join(PASTA, 'favicon.svg');
if (existsSync(icone)) {
  for (const [arquivo, tamanho] of [
    ['favicon-48.png', 48],
    ['apple-touch-icon.png', 180],
  ]) {
    const destino = path.join(PASTA, arquivo);
    if (!precisaGerar(icone, destino)) continue;
    await sharp(icone, { density: 384 }).resize(tamanho, tamanho).png().toFile(destino);
    gerados++;
  }
}

console.log(
  gerados ? `Imagens otimizadas: ${gerados} arquivo(s) gerado(s).` : 'Imagens já estão atualizadas.',
);
