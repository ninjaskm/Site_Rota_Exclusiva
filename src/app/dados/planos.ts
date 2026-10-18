// Planos e serviços pré-montados exibidos nos cartões.
// Para mudar textos ou serviços, edite este arquivo.

export interface Servico {
  nome: string;
  desc: string;
}

export interface Plano {
  id: 'motorista' | 'turismo' | 'chofer';
  titulo: string;
  resumo: string;
  detalhe: string;
  servicos: Servico[];
}

export const PLANOS: Plano[] = [
  {
    id: 'motorista',
    titulo: 'Motorista particular',
    resumo:
      'Deslocamentos do dia a dia com hora marcada: trabalho, consultas, aeroporto e eventos. Você relaxa, eu cuido do caminho.',
    detalhe:
      'Ideal para quem precisa de pontualidade e tranquilidade no dia a dia. Combinamos horário, trajeto e valor diretamente pelo WhatsApp.',
    servicos: [
      { nome: 'Traslado aeroporto', desc: 'Ida ou volta, com acompanhamento do horário do voo.' },
      { nome: 'Ida e volta', desc: 'Leva, espera e traz de volta: consultas, reuniões e compromissos.' },
      { nome: 'Eventos e festas', desc: 'Chegada e saída com conforto e sem preocupação com estacionamento.' },
      { nome: 'Por hora', desc: 'Motorista à disposição pelo tempo que você precisar.' },
    ],
  },
  {
    id: 'turismo',
    titulo: 'Turismo',
    resumo:
      'Descubra lugares incríveis do seu jeito. Conheça Recife, Olinda, Porto de Galinhas, Praia dos Carneiros, Maragogi e João Pessoa com passeios privativos planejados de acordo com seus interesses.',
    detalhe:
      'Uma experiência para aproveitar paisagens, cultura e gastronomia sem depender de excursões em grupo, com transporte e roteiro previamente combinados. Ideal para turistas, casais, famílias e moradores que desejam explorar novos destinos.',
    servicos: [
      { nome: 'Passeio de meio dia', desc: 'Um roteiro curto pelos pontos mais marcantes.' },
      { nome: 'Dia inteiro', desc: 'Passeio completo, com paradas para fotos, almoço e descanso.' },
      { nome: 'Transfer hotel', desc: 'Recepção e transporte entre hotel, aeroporto e passeios.' },
      { nome: 'Roteiro personalizado', desc: 'Você conta o que quer conhecer e montamos o trajeto.' },
    ],
  },
  {
    id: 'chofer',
    titulo: 'Chofer exclusivo',
    resumo:
      'Serviço particular com disposição e exclusividade total: um chofer só seu, no horário que você precisar, com conforto, cuidado e discrição.',
    detalhe:
      'Tenha um serviço de transporte privativo à disposição por algumas horas ou o dia todo, com horários e condições combinados previamente. Durante o período contratado, o carro e o chofer ficam exclusivamente à sua disposição, sem outros passageiros e sem pressa. Você define horários e destinos, muda de planos se precisar, e eu cuido de todo o deslocamento. Ideal para casamentos, eventos, reuniões, jantares e muito mais. Combinamos período e valor diretamente pelo WhatsApp.',
    servicos: [
      { nome: 'Diária', desc: 'Chofer à sua disposição o dia todo, com exclusividade total.' },
      { nome: 'Por hora', desc: 'Contrate apenas o tempo necessário para os seus compromissos.' },
      { nome: 'Noite e eventos', desc: 'Jantares e festas com ida e volta tranquilas, sem se preocupar com nada.' },
      { nome: 'Recorrente', desc: 'Atendimento semanal ou mensal, com rotina combinada.' },
    ],
  },
];
