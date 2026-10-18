# Vocabulário do projeto

Termos do domínio usados no código e nas conversas sobre o site.

**Plano**
Um dos tipos de atendimento oferecidos (Motorista particular, Turismo, Chofer exclusivo). Vive em `src/app/dados/planos.ts`, com título, resumo, detalhe e lista de Serviços.

**Serviço**
Uma opção pré-montada dentro de um Plano (por exemplo "Diária" ou "Traslado aeroporto"). Cada Serviço tem um link próprio de Contato.

**Contato**
Tudo o que depende do número de WhatsApp: o telefone exibido, o link de ligação e os links do WhatsApp com a mensagem pronta. Fica em `src/app/utilitarios/contato.ts`. O número real vem de `site.config.ts`.

**Fale comigo**
O botão que abre o WhatsApp. Pode ser geral (sem Plano) ou sobre um Plano específico. Fica em `src/app/componentes/fale-comigo.ts`. O botão do topo do site é uma variante à parte (mostra o telefone e uma seta).

**Página de plano**
A página `/plano/:id` que mostra o detalhe de um Plano e a lista dos seus Serviços.

**Configuração do site**
Os dados pessoais (nome, WhatsApp, fotos e textos do "Sobre mim") ficam em `site.config.ts`, que não vai para o GitHub. O modelo público é `site.config.example.ts`.
