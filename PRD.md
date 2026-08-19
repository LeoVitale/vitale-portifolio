# PRD — Portfólio de Leonardo Vitale

## 1. Visão do produto

Criar um portfólio pessoal editorial e visual que posicione Leonardo Vitale como Principal / Lead Front-End Engineer, mostrando a evolução de sua carreira de UX e interfaces rich-media até engenharia React, arquitetura de front-end, liderança técnica e adoção responsável de IA.

O site não é uma coleção de screenshots nem uma landing page genérica de desenvolvedor. Ele é uma exposição digital curada: cada capítulo combina contexto, contribuição individual, resultado e evidência visual.

## 2. Problema e oportunidade

Recrutadores, hiring managers e líderes de produto/engenharia precisam avaliar rapidamente a senioridade, a trajetória e o impacto de Leonardo. Currículos lineares não evidenciam bem:

- a transição contínua entre design, produto e engenharia;
- a experiência pioneira com VOD, consoles e experiências conectadas;
- a maturidade atual em arquitetura, qualidade e liderança;
- os artefatos visuais que comprovam a amplitude do trabalho histórico.

O portfólio deve tornar essa narrativa compreensível em menos de 30 segundos na Home e oferecer profundidade nos cases prioritários.

## 3. Objetivos

1. Comunicar uma proposta de valor clara para oportunidades de Principal/Lead Front-End Engineer.
2. Apresentar uma história de evolução tecnológica coerente, sem exagerar escopo, datas, métricas ou responsabilidades.
3. Priorizar os cases NET NOW, Xbox One, SKY Online e Microsoft/GPA com boa evidência visual.
4. Mostrar o capítulo atual na Xelix sem expor informação confidencial.
5. Garantir uma experiência editorial, responsiva e acessível em desktop e mobile.

## 4. Público-alvo

### Público primário

- Recrutadores e hiring managers contratando para posições Lead ou Principal de Front-End.
- Lideranças de engenharia, produto e design que valorizam domínio técnico, UX e gestão de pessoas.

### Público secundário

- Pares técnicos interessados em arquitetura de front-end, modernização e práticas de engenharia.
- Empresas que avaliam consultoria, liderança técnica ou colaboração em produtos digitais.

## 5. Mensagem central

> Designing interfaces. Building products. Leading front-end evolution.

**Posicionamento:** profissional de front-end com base em UX e design de produto, que atravessou transições tecnológicas — Silverlight, VOD, Xbox, React, arquitetura e IA assistida — e ajudou times a transformá-las em experiências e padrões de engenharia escaláveis.

## 6. Escopo

### P1 — MVP

- Home editorial com hero, sinais de carreira, mosaico de cases, linha do tempo, capítulo atual e CTA.
- Navegação global para Work, Timeline, About, Resume e Contact.
- Cases detalhados: NET NOW, Xbox One, SKY Online Web e Microsoft/GPA.
- Página About / Resume em HTML semântico com link para o currículo atualizado.
- Conteúdo de contato baseado exclusivamente no currículo mais recente ou em dados confirmados pelo proprietário.
- Galerias de assets históricos disponíveis, preservando proporções e contexto.
- Implementação em React, TypeScript e Vite, aproveitando a base já existente no repositório.
- Todo o conteúdo e toda a interface disponíveis em Português (Brasil) e Inglês.
- Layout responsivo, navegação por teclado, foco visível, contraste suficiente e suporte a `prefers-reduced-motion`.

### P2 — Depois da validação do MVP

- Índice de trabalhos e cases de arquivo: Xbox 360, Windows 8 / SKY Online, CNA e Video Commerce.
- Case abstrato da Xelix com princípios, diagramas e métricas aprovadas.
- Refinamentos de motion, SEO básico e links históricos/captions onde houver fonte confiável.

### P3 — Opcional

- Filtro de marcas na galeria Xbox.
- Analytics, formulário de contato, domínio, política de privacidade e estratégia de publicação.

## 7. Fora de escopo

| Item | Motivo |
| --- | --- |
| Backend, banco de dados, autenticação e CMS | Não contribuem para a validação da narrativa e do design do protótipo. |
| Formulário que armazena ou encaminha dados | Exige definição de privacidade, antispam e operação. |
| Suite de testes automatizada | O briefing original orienta validação visual/manual para a primeira versão. |
| Painel administrativo ou edição de conteúdo no navegador | Conteúdo será mantido no repositório nesta fase. |
| Screenshots, métricas ou detalhes internos da Xelix sem aprovação | Há risco de confidencialidade. |
| Publicação do case Telenor | O briefing o bloqueia até confirmação de conteúdo e papel de Leonardo. |
| Tratar CNA e Video Commerce como produtos lançados | Ambos são protótipos/propostas comerciais. |

## 8. Arquitetura de informação

### Navegação

- Work
- Timeline
- About
- Resume
- Contact

### Rotas/páginas esperadas

| Página | Objetivo |
| --- | --- |
| `/` | Comunicar o posicionamento, os capítulos de carreira e os cases selecionados. |
| `/work` | Listar trabalhos e separar cases prioritários do arquivo. |
| `/work/net-now` | Mostrar a transição de UX leadership para engenharia React. |
| `/work/xbox-one` | Mostrar o sistema VOD multimarcas para Xbox One. |
| `/work/sky-online` | Mostrar a amplitude do sistema visual do produto web. |
| `/work/microsoft-gpa` | Mostrar o capítulo de Silverlight e inovação corporativa inicial. |
| `/about` | Disponibilizar perfil, experiência, expertise, formação e currículo. |

As rotas podem ser ajustadas ao roteamento existente, desde que os destinos e a navegação permaneçam equivalentes.

### Idiomas

- Na primeira visita sem locale, o idioma do navegador define `pt-BR` ou `en`; idiomas não suportados usam `pt-BR`.
- Inglês é oferecido como alternativa completa: `en`.
- O seletor de idioma deve estar disponível em todas as páginas globais e preservar a página atual ao trocar de idioma.
- A escolha explícita deve ser lembrada para futuras visitas sem locale.
- Cada rota deve ter um URL canônico por idioma para permitir compartilhamento e indexação. A convenção proposta é `/pt-br/...` e `/en/...`.

## 9. Direção de conteúdo e visual

### Regras editoriais

- Escrever com segurança e precisão, sem adjetivos promocionais vazios.
- Separar sempre contexto, papel individual, resultado coletivo e evidência.
- Usar intervalo de anos ou “circa” quando a data não estiver confirmada.
- Usar “eu projetei”, “eu liderei” ou “eu implementei” somente para responsabilidades documentadas.
- Identificar claramente protótipos e propostas que não chegaram a produção.
- Não publicar métricas exatas sem fonte curricular ou aprovação explícita.
- Manter conteúdo equivalente em `pt-BR` e `en`; nomes próprios, marcas, tecnologias, datas e fatos não devem ser traduzidos ou alterados.
- Adaptar a redação, em vez de traduzir literalmente, quando isso preservar melhor tom, clareza e precisão no idioma de destino.

### Hierarquia de cases

1. NET NOW — case principal e ponto de virada para React.
2. Xbox One — galeria editorial multimarcas.
3. SKY Online Web — sistema visual completo que avançou de protótipo para produto.
4. Microsoft / GPA — inovação com Silverlight e experiência corporativa.
5. Xelix — capítulo atual de arquitetura e liderança, sem screenshots confidenciais.
6. Internacional — Publicis Sapient, CarNext e Tacx/Garmin como capítulo agrupado.

### Linguagem visual

- Exposição digital curada, não template de portfólio de desenvolvedor.
- Adaptar a gramática visual de `/Users/vitale/Downloads/DESIGN-clickhouse.md` ao conteúdo do portfólio.
- Usar canvas quase preto `#0a0a0a`, texto branco/cinza e amarelo elétrico `#faff69` como único acento de marca.
- Usar Inter, com peso 700 e tracking negativo nos displays, 600 em labels/botões e 400 no corpo.
- Usar grid editorial de 12 colunas, largura máxima de 1280 px e ritmo de 96 px entre seções no desktop.
- Screenshots históricos grandes e sem mockups de dispositivo desnecessários.
- Mosaico assimétrico em desktop e narrativa vertical em mobile.
- Usar superfícies planas, hairlines e contraste; não usar sombras, gradientes, glassmorphism ou motivos de terminal/SQL.
- Motion discreto para orientação; sem parallax excessivo, scroll hijacking, loaders longos ou efeitos decorativos pesados.

## 10. Fontes e integridade de conteúdo

### Precedência de fonte

1. Histórico confirmado diretamente por Leonardo.
2. Currículo mais recente fornecido no briefing.
3. Briefing editorial e rascunhos de conteúdo.
4. Assets fornecidos no arquivo de origem.
5. Pesquisa externa, apenas para contexto histórico ou confirmação pública.

### Restrições de publicação

- Dados de localização, telefone e cargo público devem vir do currículo mais recente ou de confirmação explícita.
- O currículo antigo é histórico; não deve sobrescrever dados atuais.
- Métricas de onboarding podem ser usadas somente quando suportadas pelo currículo atual; métrica de performance superior a 30% permanece fora do MVP até validação.
- Marcas, logos e screenshots devem ser usados somente quando houver permissão e adequação de licença.
- Telenor permanece excluído até revisão explícita.

## 11. Histórias de usuário e critérios de aceitação

### P1 — Posicionamento e navegação

**US-01 — Compreender o perfil**

Como recrutador, quero entender a senioridade, especialidade e trajetória de Leonardo na primeira visita para decidir se devo explorar o portfólio.

**Critérios de aceitação**

1. **PORT-01** — WHEN um visitante abrir a Home, THEN o sistema SHALL exibir a headline, um resumo de posicionamento e CTAs para trabalhos, currículo e contato acima da primeira dobra em viewport desktop de 1440 px.
2. **PORT-02** — WHEN um visitante navegar pela Home por até 30 segundos, THEN o sistema SHALL comunicar experiência em design/front-end, evolução tecnológica, relevância de NET NOW/Xbox/SKY e o capítulo atual de liderança.
3. **PORT-03** — WHEN um visitante acionar qualquer item da navegação global, THEN o sistema SHALL levá-lo ao destino correspondente.
4. **PORT-04** — WHILE a navegação estiver visível, o sistema SHALL expor todos os destinos globais por links semanticamente identificáveis.

**Teste independente:** abrir a Home em uma sessão sem contexto e confirmar, em até 30 segundos, as quatro mensagens e três destinos principais.

### P1 — Home editorial

**US-02 — Explorar os capítulos prioritários**

Como hiring manager, quero visualizar os principais cases e sua relevância para avaliar a profundidade da experiência.

**Critérios de aceitação**

1. **PORT-05** — WHEN o visitante alcançar o mosaico de trabalhos selecionados, THEN o sistema SHALL exibir NET NOW, Xbox One, SKY Online, Microsoft/GPA e Xelix.
2. **PORT-06** — WHILE um card de case estiver visível, o sistema SHALL apresentar nome, período, papel e uma frase de significado editorial.
3. **PORT-07** — WHEN o visitante selecionar um card de case prioritário, THEN o sistema SHALL abrir o case detalhado correspondente.
4. **PORT-08** — WHEN o visitante visualizar a linha do tempo, THEN o sistema SHALL mostrar a sequência Web Design → Silverlight → Streaming → Xbox → React → Global Engineering → Architecture → AI.

**Teste independente:** conferir os cinco cards, seus metadados e os links para os quatro cases detalhados.

### P1 — Cases históricos

**US-03 — Avaliar a contribuição em um case**

Como líder de engenharia ou produto, quero ler um case estruturado e ver evidências para entender o papel de Leonardo e o resultado do trabalho.

**Critérios de aceitação**

1. **PORT-09** — WHEN um visitante abrir NET NOW, Xbox One, SKY Online ou Microsoft/GPA, THEN o sistema SHALL exibir título, período, papel, de três a cinco tags e uma tese de uma frase.
2. **PORT-10** — WHEN um visitante ler um case prioritário, THEN o sistema SHALL exibir seções de contexto, papel de Leonardo, história visual, impacto/resultado e conexão com a próxima fase da carreira.
3. **PORT-11** — WHILE uma galeria histórica estiver visível, o sistema SHALL preservar a proporção original de cada asset.
4. **PORT-12** — WHEN houver imagem abaixo da primeira dobra, THEN o sistema SHALL usar carregamento tardio e declarar dimensões para reduzir mudança de layout.
5. **PORT-13** — IF uma imagem não puder ser carregada, THEN o sistema SHALL manter texto alternativo significativo e não impedir a leitura do conteúdo do case.

**Teste independente:** abrir cada case prioritário, verificar todas as seções e confirmar que as imagens não sofrem distorção.

### P1 — Verdade editorial

**US-04 — Confiar no conteúdo**

Como visitante, quero que o portfólio diferencie resultados entregues de propostas para interpretar corretamente cada trabalho.

**Critérios de aceitação**

1. **PORT-14** — WHEN o sistema apresentar CNA ou Video Commerce, THEN o sistema SHALL mostrar de forma visível “Protótipo / proposta comercial — não lançado”.
2. **PORT-15** — WHEN uma data exata não estiver confirmada, THEN o sistema SHALL usar um intervalo de anos ou o termo “circa”.
3. **PORT-16** — IF uma métrica não possuir fonte curricular identificada ou aprovação explícita, THEN o sistema SHALL omitir a métrica numérica.
4. **PORT-17** — WHERE o capítulo da Xelix estiver presente, o sistema SHALL usar conteúdo abstrato ou autorizado e não SHALL exibir screenshots internos não aprovados.

**Teste independente:** revisar os cases secundários e o capítulo Xelix contra o briefing de conteúdo.

### P1 — About, currículo e contato

**US-05 — Avaliar experiência e iniciar contato**

Como recrutador, quero consultar o currículo em página e PDF, além de encontrar um meio de contato, para seguir com uma oportunidade.

**Critérios de aceitação**

1. **PORT-18** — WHEN o visitante abrir About/Resume, THEN o sistema SHALL exibir perfil, conquistas, experiência, formação e especialidades em HTML semântico.
2. **PORT-19** — WHEN o visitante acionar o CTA de currículo, THEN o sistema SHALL disponibilizar o PDF do currículo mais recente em destino válido.
3. **PORT-20** — WHEN o visitante acionar o CTA de contato, THEN o sistema SHALL oferecer o canal de contato confirmado pelo proprietário.
4. **PORT-21** — IF o PDF do currículo estiver indisponível, THEN o sistema SHALL manter a versão HTML acessível e informar que o download não está disponível.

**Teste independente:** verificar as seções semânticas, abrir o PDF e testar o CTA de contato.

### P1 — Bilinguismo

**US-06 — Escolher o idioma do portfólio**

Como visitante brasileiro ou internacional, quero consultar o portfólio integralmente em Português (Brasil) ou Inglês para compreender o conteúdo no meu idioma.

**Critérios de aceitação**

1. **PORT-31** — WHEN um visitante abrir pela primeira vez uma rota sem locale, THEN o sistema SHALL usar `en` para navegador em inglês e `pt-BR` para navegador em português ou idioma não suportado.
2. **PORT-32** — WHEN o visitante selecionar Português (Brasil) ou Inglês, THEN o sistema SHALL apresentar toda a interface e o conteúdo da página atual no locale escolhido.
3. **PORT-33** — WHEN o visitante trocar de idioma, THEN o sistema SHALL manter o equivalente da página atual e atualizar o URL canônico do locale.
4. **PORT-34** — WHILE uma página estiver renderizada em `pt-BR` ou `en`, o sistema SHALL declarar o atributo HTML `lang` correspondente.
5. **PORT-35** — IF uma tradução obrigatória de uma página P1 estiver ausente, THEN o sistema SHALL bloquear a publicação dessa página até que os dois idiomas estejam completos.

**Teste independente:** alternar idiomas na Home, em cada case P1 e em About, verificando conteúdo completo, URL e atributo `lang`.

### P1 — Responsividade e acessibilidade

**US-07 — Navegar em diferentes condições**

Como visitante em desktop, mobile ou teclado, quero consumir o portfólio sem perda de conteúdo ou controle.

**Critérios de aceitação**

1. **PORT-22** — WHEN a largura de viewport for 390 px, THEN o sistema SHALL empilhar o mosaico em cards legíveis sem rolagem horizontal.
2. **PORT-23** — WHEN a largura de viewport for 1440 px, THEN o sistema SHALL preservar a hierarquia editorial com NET NOW como maior destaque do mosaico.
3. **PORT-24** — WHEN o visitante navegar apenas com teclado, THEN o sistema SHALL permitir alcançar navegação, CTAs e controles de galeria em ordem previsível.
4. **PORT-25** — WHILE um elemento interativo possuir foco de teclado, o sistema SHALL exibir um indicador de foco visível.
5. **PORT-26** — WHEN o dispositivo informar `prefers-reduced-motion: reduce`, THEN o sistema SHALL remover ou reduzir animações decorativas sem ocultar conteúdo.
6. **PORT-27** — WHILE conteúdo textual e controles estiverem visíveis, o sistema SHALL manter contraste suficiente para leitura e interação.

**Teste independente:** revisar desktop e mobile, navegar por teclado e emular redução de movimento.

### P2 — Arquivo e capítulo atual

**US-07 — Aprofundar-se em outros capítulos**

Como visitante interessado, quero explorar trabalhos de arquivo e o capítulo atual para entender a amplitude da carreira.

**Critérios de aceitação**

1. **PORT-28** — WHEN o índice de Work estiver disponível, THEN o sistema SHALL diferenciar visualmente cases prioritários de casos de arquivo.
2. **PORT-29** — WHEN o visitante abrir Xbox 360, Windows 8, CNA ou Video Commerce, THEN o sistema SHALL manter o mesmo template editorial dos cases prioritários.
3. **PORT-30** — WHERE o case Xelix estiver publicado, o sistema SHALL incluir princípios, liderança, arquitetura ou linha do tempo de ferramentas com dados autorizados.

## 12. Requisitos não funcionais

| Área | Requisito |
| --- | --- |
| Conteúdo | A fonte atual prevalece sobre o currículo histórico; nenhuma alegação deve ser inventada. |
| Stack | O produto usa React, TypeScript e Vite já presentes no repositório; não adicionar backend, CMS, autenticação ou dependências pesadas sem necessidade aprovada. |
| Internacionalização | `pt-BR` e `en` devem ter conteúdo completo para todas as rotas P1, com URL e `lang` próprios. |
| Performance | Imagens históricas precisam de derivados otimizados quando prático, com originais preservados no arquivo-fonte. |
| Acessibilidade | HTML semântico, alt text, foco visível, navegação por teclado, contraste e reduced motion são obrigatórios no MVP. |
| Interação | JavaScript deve ser limitado a interações que melhorem materialmente navegação e galeria. |
| Segurança e privacidade | Sem coleta, armazenamento ou processamento de dados pessoais no MVP. |
| Qualidade | O MVP exige revisão visual manual em desktop e mobile antes de ser considerado pronto. |

## 13. Premissas, decisões pendentes e riscos

| Tema | Premissa adotada para o PRD | Status |
| --- | --- | --- |
| Stack | React, TypeScript e Vite são a base confirmada para a implementação. Não incluir backend, CMS, autenticação ou dependências pesadas. | Confirmada |
| Idioma | `pt-BR` e `en` são obrigatórios. A primeira visita usa o idioma suportado do navegador com fallback para `pt-BR`; a escolha explícita fica persistida. | Confirmada |
| Cargo público | Usar “Front-End Tech Lead”. | Confirmada |
| Dados de contato | Publicar o e-mail e o telefone do currículo mais recente. | Confirmada |
| Assets | Copiar as 80 imagens de `briefing/portifolio/` para uma estrutura pública versionada e gerar derivados otimizados quando prático. | Confirmada |
| Métricas | O ganho de onboarding pode ser usado se refletir o currículo atual; performance superior a 30% fica bloqueada sem validação. | Confirmada para o MVP |
| Xelix | Não exibir screenshots de produto; usar narrativa, diagramas ou elementos explicitamente autorizados. | Confirmada para o MVP |
| Telenor | Excluir da primeira versão. | Confirmada para o MVP |

## 14. Critérios de sucesso do MVP

- Um visitante consegue explicar a proposta de valor e a evolução de carreira em até 30 segundos.
- Os quatro cases prioritários estão publicados com conteúdo, metadados e evidência visual adequados.
- A Home leva a work, currículo e contato sem ambiguidade.
- As rotas P1 têm conteúdo integral em `pt-BR` e `en`, com troca de idioma que preserva a página atual.
- Nenhum case apresenta protótipo como produto lançado ou métrica sem suporte.
- A navegação funciona por teclado e a interface permanece legível em 390 px e 1440 px.
- A revisão visual manual aprova hierarquia, responsividade, proporção das imagens, foco, overflow e reduced motion.

## 15. Rastreabilidade inicial

| ID | Prioridade | Área | Estado inicial |
| --- | --- | --- | --- |
| PORT-01 a PORT-04 | P1 | Hero e navegação | Pendente |
| PORT-05 a PORT-08 | P1 | Home editorial | Pendente |
| PORT-09 a PORT-13 | P1 | Cases prioritários | Pendente |
| PORT-14 a PORT-17 | P1 | Integridade editorial | Pendente |
| PORT-18 a PORT-21 | P1 | About, currículo e contato | Pendente |
| PORT-22 a PORT-27 | P1 | Responsividade e acessibilidade | Pendente |
| PORT-31 a PORT-35 | P1 | Bilinguismo | Pendente |
| PORT-28 a PORT-30 | P2 | Arquivo e Xelix | Pendente |

## 16. Próximo passo com `/tlc-spec-driven`

Usar este PRD para criar a feature `portfolio-v1` e gerar a especificação em `.specs/features/portfolio-v1/spec.md`. Antes da execução, confirmar apenas título público, canais de contato e licenças/disponibilidade dos assets.
