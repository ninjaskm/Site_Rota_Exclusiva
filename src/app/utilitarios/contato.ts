import { SITE } from '../dados/site.config';
import { Plano } from '../dados/planos';

// Contato: tudo o que depende do número de WhatsApp em site.config.ts.
// O número é guardado só com dígitos, que é o que o wa.me e o tel: exigem.

const NUMERO = SITE.whatsapp.replace(/\D/g, '');

// Ex.: 5581999999999 -> (81) 99999-9999
function formatarTelefone(digitos: string): string {
  const semPais = digitos.startsWith('55') ? digitos.slice(2) : digitos;
  return `(${semPais.slice(0, 2)}) ${semPais.slice(2, 7)}-${semPais.slice(7)}`;
}

function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

// Telefone para exibir na tela
export const TELEFONE = formatarTelefone(NUMERO);

// Formato internacional (+5581999999999), usado também nos dados estruturados de SEO
export const TELEFONE_E164 = `+${NUMERO}`;

// Link para ligar direto ao tocar no número
export const TELEFONE_LINK = `tel:${TELEFONE_E164}`;

export function linkGeral(): string {
  return linkWhatsapp('Olá! Vim pelo site e gostaria de mais informações.');
}

export function linkPlano(plano: Plano): string {
  return linkWhatsapp(
    `Olá! Vim pelo site e gostaria de um orçamento de ${plano.titulo.toLowerCase()}.`,
  );
}

export function linkServico(plano: Plano, servico: string): string {
  return linkWhatsapp(`Olá! Vim pelo site e gostaria de um orçamento: ${plano.titulo} – ${servico}.`);
}
