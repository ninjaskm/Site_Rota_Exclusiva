import { SITE } from '../dados/site.config';
import { Plano } from '../dados/planos';

function whatsapp(mensagem: string): string {
  const numero = SITE.whatsapp.replace(/[^0-9A-Za-z]/g, '');
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function linkGeral(): string {
  return whatsapp('Olá! Vim pelo site e gostaria de mais informações.');
}

export function linkPlano(plano: Plano): string {
  return whatsapp(
    `Olá! Vim pelo site e gostaria de um orçamento de ${plano.titulo.toLowerCase()}.`,
  );
}

export function linkServico(plano: Plano, servico: string): string {
  return whatsapp(`Olá! Vim pelo site e gostaria de um orçamento: ${plano.titulo} – ${servico}.`);
}
