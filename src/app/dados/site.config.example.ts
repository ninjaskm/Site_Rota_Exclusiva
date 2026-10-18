// MODELO da configuração do site (sem dados pessoais).
//
// Para rodar o projeto, copie este arquivo para "site.config.ts" (mesma pasta)
// e troque os valores pelos seus. O "site.config.ts" real está no .gitignore
// e não vai para o GitHub.
//
//   Windows (PowerShell):  Copy-Item src/app/dados/site.config.example.ts src/app/dados/site.config.ts

export const SITE = {
  // Nome que aparece no topo, no rodapé e nas mensagens
  nome: 'Seu Nome ou Marca',

  // WhatsApp com código do país + DDD + número, só dígitos. Exemplo: '5581999999999'
  whatsapp: '5500000000000',

  // Foto de perfil (círculo no topo). Coloque a imagem na pasta "public"
  // e escreva o nome do arquivo aqui, por exemplo: 'perfil.jpg'.
  // Deixe vazio para mostrar o espaço reservado.
  fotoPerfil: '',

  // Foto do carro. Coloque a imagem na pasta "public" e escreva o nome aqui.
  // Deixe vazio para não mostrar a foto em nenhum lugar do site.
  fotoCarro: '',

  // Foto de paisagem, exibida no topo da página de Turismo.
  // Deixe vazio para não mostrar.
  fotoPaisagem: '',

  // Onde a foto do carro aparece. Troque true por false para tirar de um lugar específico.
  carroEm: {
    inicio: false, // faixa larga na página inicial, antes dos cartões
    sobre: true, // página "Sobre mim", depois do texto
    planos: false, // topo das páginas Motorista particular, Turismo e Chofer
  },

  // Texto da página "Sobre mim". Cada item entre aspas é um parágrafo
  // (o primeiro aparece maior, como saudação).
  sobre: [
    'Olá, sou [seu nome]!',
    'Escreva aqui uma apresentação sobre você e sobre o seu serviço.',
    'Conte o que torna o seu atendimento especial.',
  ],

  // Frase final da página "Sobre mim", logo acima do botão do WhatsApp.
  sobreFecho: '',

  // Bloco de destaque da página "Sobre mim" (título, texto e dois itens).
  // Para tirar o bloco inteiro, apague o conteúdo de titulo: ''
  sobreDestaque: {
    titulo: 'Título de destaque.',
    texto: 'Uma frase curta resumindo o seu diferencial.',
    itens: [
      {
        titulo: 'Primeiro diferencial',
        desc: 'Descrição curta do primeiro diferencial.',
      },
      {
        titulo: 'Segundo diferencial',
        desc: 'Descrição curta do segundo diferencial.',
      },
    ],
  },
};
