import { SITE } from '../dados/site.config';

// Telefone formatado a partir de site.config.ts > whatsapp. Ex.: (81) 98593-7211
export const TELEFONE = (() => {
  const digitos = SITE.whatsapp.replace(/\D/g, '');
  const n = digitos.startsWith('55') ? digitos.slice(2) : digitos;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
})();

// Link para ligar direto ao tocar no número
export const TELEFONE_LINK = `tel:+${SITE.whatsapp.replace(/\D/g, '')}`;
