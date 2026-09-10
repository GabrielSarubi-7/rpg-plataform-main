# Guia do Projeto RPG Platform

Este documento e o ponto de entrada para novos desenvolvedores. Ele descreve a organizacao atual do projeto, onde encontrar cada funcionalidade e quais cuidados tomar para manter a base escalavel.

## Visao Geral

O projeto e um monorepo npm com duas aplicacoes e uma camada compartilhada:

- `apps/client`: cliente React/Vite, interface do jogo, canvas do mapa, fichas, audio, chat e estado local.
- `apps/server`: API HTTP, Socket.IO, persistencia com Prisma/PostgreSQL e regras de autorizacao no servidor.
- `shared`: contratos TypeScript e regras puras reutilizadas por cliente e servidor.

Regra pratica: se uma regra precisa ser igual no cliente e no servidor, coloque em `shared/rules` ou `shared/types`. Se a regra depende de banco, fica em `apps/server/src`. Se depende de DOM, React, Zustand ou canvas, fica em `apps/client/src`.

## Scripts Principais

Na raiz:

```bash
npm run dev
npm run dev:client
npm run dev:server
npm run typecheck
npm run build
npm run build:client
npm run build:server
```

No client:

```bash
npm run dev -w client
npm run typecheck -w client
npm run build -w client
```

No server:

```bash
npm run dev -w server
npm run typecheck -w server
npm run build -w server
npm run migrate:assets -w server
```

## Ambiente e Dependencias

Dependencias externas obrigatorias:

- Node.js 22 ou superior;
- npm;
- PostgreSQL;
- Git.

Variaveis principais do server:

- `DATABASE_URL`: conexao PostgreSQL;
- `JWT_SECRET`: segredo de autenticacao;
- `CLIENT_ORIGIN`: origem aceita por CORS e Socket.IO;
- `PORT`: porta do server;
- `ASSET_STORAGE_DIR`: pasta opcional para assets persistidos;
- `ASSET_UPLOAD_LIMIT`: limite de upload em `/assets`;
- `JSON_BODY_LIMIT`: limite de JSON HTTP;
- `SOCKET_MAX_BUFFER_BYTES`: limite de payload do Socket.IO.

Variavel principal do client:

- `VITE_SERVER_URL`: URL publica/absoluta do server quando nao usar o proxy do Vite.

O guia operacional completo fica em `docs/COMO_RODAR.md`.

## Estrutura do Client

Base:

- `apps/client/src/App.tsx`: decide entre tela normal e janela destacada de ficha.
- `apps/client/src/main.tsx`: bootstrap React.
- `apps/client/src/core/api`: configuracao de API HTTP.
- `apps/client/src/core/api/serverUrl.ts`: resolve URL do servidor.
- `apps/client/src/core/api/parseResponse.ts`: parse padronizado de respostas HTTP `{ ok, error }`.
- `apps/client/src/core/socket/socket.ts`: instancia Socket.IO usada pelos services.
- `apps/client/src/styles`: estilos globais e utilitarios.
- `apps/client/src/shared/components/ui`: componentes genericos de UI.
- `apps/client/src/shared/utils`: utilitarios de UI/DOM.

Features:

- `features/auth`: login, cadastro, token e usuario atual.
- `features/campaigns`: tela de campanhas, criacao/entrada por convite, gerenciamento de campanha, sistema da mesa e membros.
- `features/game`: tela principal da mesa, sidebar direita, configuracoes e editor de modelo de ficha.
- `features/map`: canvas do mapa, camera 2D/2.5D, mapas, grid, fog, imagens de fundo/camadas e editor de mapa.
- `features/tokens`: renderizacao, menus, store e eventos de token.
- `features/characters`: fichas, arvore/categorias, editor de ficha, configuracoes, biografia e janela destacada.
- `features/actions`: barra de acoes, editor de habilidades/recursos, preview de alvos e rolagens.
- `features/turns`: fila de turnos no topo e eventos de turno.
- `features/chat`: chat textual e mensagens de rolagem.
- `features/dice`: rolagem de dados, incluindo rolagem privada do GM.
- `features/audio`: fila de audio da mesa, player global, YouTube/MP3 e controle de volume.
- `features/annotations`: ferramenta de lapis/texto no mapa, sincronizada online.
- `features/assets`: upload/compactacao de imagens e upload de MP3.
- `features/lobby`: estado online da sala/campanha ao vivo.
- `features/ui`: estado global de paineis, sidebar, escala, volume, cor do jogador e preferencias locais.

## Estrutura do Server

Base:

- `apps/server/src/index.ts`: Express, CORS, rotas e Socket.IO.
- `apps/server/src/db/prisma.ts`: Prisma Client.
- `apps/server/src/middleware/authMiddleware.ts`: autenticacao JWT para rotas HTTP.
- `apps/server/src/utils/routeParams.ts`: helper unico para parametros de rota.

Dominios:

- `auth`: cadastro, login, senha, JWT e `/auth`.
- `campaigns`: campanhas, convites, membros, cargos, sistema/modelo da mesa e helpers de acesso.
- `campaigns/campaignAccess.ts`: acesso compartilhado de campanha, `ensureCampaignAccess`, `ensureCampaignGmAccess` e `isGmRole`.
- `characters`: CRUD de fichas e permissoes de ficha.
- `maps`: CRUD de mapas, mapa ativo e conversao de mapa/token do banco para cliente.
- `assets`: upload de imagem/audio e migracao de assets base64 antigos.
- `live`: estado em memoria da mesa online, Socket.IO, chat, tokens, mapa ao vivo, turnos, audio, dados e anotacoes.

Banco:

- `apps/server/prisma/schema.prisma`: fonte do modelo relacional.
- `apps/server/prisma/migrations`: migracoes.
- `apps/server/src/generated/prisma`: cliente Prisma gerado. Nao editar manualmente.

## Shared

- `shared/types`: contratos transportados entre client/server.
- `shared/rules`: regras puras compartilhadas.
- `shared/utils/math.ts`: utilitarios matematicos como `clamp`.
- `shared/constants`: constantes pequenas compartilhadas.

Principais regras:

- `systemRegistry.ts`: catalogo de sistemas de RPG registrados. Hoje apenas `dnd5e` esta disponivel.
- `systems/types.ts`: contrato compartilhado para cadastrar sistemas, regras, layout e renderer de ficha.
- `systems/dnd5e.ts`: modulo do sistema D&D 5e e exemplo base para novos sistemas.
- `campaignSettingsRules.ts`: criacao e normalizacao de settings da campanha, incluindo conversao de legado `custom` para `dnd5e`.
- `mapRules.ts`: configuracao de mapa, layer config, fog, imagens e filtro do que players podem ver.
- `tokenRules.ts`: tamanho, posicao e clamping de token.
- `targetingRules.ts`: resolucao de alvo/area para acoes.
- `diceRules.ts`: parse/rolagem/formato de dados.
- `audioRules.ts`: fila de audio e validacao de YouTube/MP3.

## Fluxos de Funcionalidade

### Login e Sessao

Client:

- `features/auth/components/AuthScreen.tsx`
- `features/auth/store/authStore.ts`
- `features/auth/services/authApi.ts`

Server:

- `auth/authRoutes.ts`
- `auth/authService.ts`
- `auth/jwt.ts`
- `auth/password.ts`

### Tela de Campanhas

Client:

- `features/campaigns/components/CampaignsScreen.tsx`
- `features/campaigns/store/campaignStore.ts`
- `features/campaigns/services/campaignApi.ts`
- `features/campaigns/utils/campaignPermissions.ts`

Server:

- `campaigns/campaignRoutes.ts`
- `campaigns/campaignService.ts`
- `campaigns/campaignAccess.ts`

Funcionalidades atuais:

- criar campanha escolhendo um sistema registrado pelo catalogo;
- entrar por convite;
- abrir mesa;
- gerenciar players;
- dar/remover GM;
- remover membro;
- excluir/arquivar campanha;
- trocar sistema da mesa. O antigo `custom` e aceito apenas como legado e convertido para `dnd5e`.

### Mesa Online

Client:

- `features/game/GameScreen.tsx`
- `multiplayer/hooks/useCampaignLiveSession.ts`
- `multiplayer/hooks/useRoomSocketEvents.ts`
- `features/lobby/store/lobbyStore.ts`

Server:

- `live/liveSocketHandlers.ts`
- `live/liveRoomService.ts`

O estado ao vivo vem de `RoomState` em `shared/types/multiplayer.ts`. Mudancas online devem sempre ter:

- tipo/payload em `shared/types/multiplayer.ts`;
- emissor no client em `features/*/services/*SocketService.ts`;
- handler no server em `live/liveSocketHandlers.ts`;
- atualizacao de room state em `live/liveRoomService.ts` quando persistente ou compartilhada;
- sincronizacao no client via `useRoomSocketEvents.ts`.

### Mapas, Grid, Fog e Imagens

Client:

- `features/map/MapCanvas.tsx`
- `features/map/components/Grid.tsx`
- `features/map/components/FogLayer.tsx`
- `features/map/components/MapBackground.tsx`
- `features/map/components/MapImageLayer.tsx`
- `features/map/components/MapLocatorIndicator.tsx`
- `features/map/components/TokenDragPreview.tsx`
- `features/map/components/MapEditorModal.tsx`
- `features/map/components/MapLibraryModal.tsx`
- `features/map/store/campaignMapStore.ts`
- `features/map/store/mapStore.ts`
- `features/map/services/mapApi.ts`
- `features/map/services/mapSocketService.ts`

Server:

- `maps/mapRoutes.ts`
- `maps/mapService.ts`
- `live/liveRoomService.ts`
- `live/liveSocketHandlers.ts`

Shared:

- `shared/types/map.ts`
- `shared/rules/mapRules.ts`
- `shared/rules/tokenRules.ts`

Performance:

- `Grid.tsx` usa patterns SVG repetidos em vez de uma linha por coluna/linha.
- `mapStore.setMapSettings` ignora configuracoes identicas por assinatura local, reduzindo re-render quando `room:state` chega por outro motivo.

Regras atuais:

- GM pode preparar imagens fora do grid e arrastar para dentro do mapa.
- Imagens de mapa ficam acima do background e abaixo dos tokens.
- Imagens so ficam visiveis para todos depois de entrarem no grid.
- Imagens de camada podem ser redimensionadas por alcas.
- Se o grid sair da tela, `MapLocatorIndicator` aponta para a borda mais proxima.
- Durante drag de token, `TokenDragPreview` mostra a imagem semi-transparente e a rota em ft.
- Cada quadrado conta como 5 ft; diagonal tambem conta como 5 ft.

### Tokens

Client:

- `features/tokens/components/Token.tsx`
- `features/tokens/components/TokenLayer.tsx`
- `features/tokens/components/TokenContextMenu.tsx`
- `features/tokens/store/tokenStore.ts`
- `features/tokens/services/tokenSocketService.ts`

Server:

- eventos `token:*` em `live/liveSocketHandlers.ts`;
- persistencia em `live/liveRoomService.ts`;
- modelo `MapToken` em Prisma.

Regra de permissao:

- GM controla todos os tokens;
- player controla apenas tokens de fichas permitidas/dono;
- validacao final fica no servidor.

Sincronizacao:

- movimento usa `token:moved`, sem `room:state` completo;
- add/update/delete visual usam `token:added`, `token:updated` e `token:deleted` para evitar reenviar mapa, audio, turnos e todos os tokens quando so um token mudou;
- `room:state` continua sendo usado para entrada na sala, troca de mapa, turnos, audio e estados compartilhados maiores.

Visual:

- efeitos, condicoes e barras de vida ficam fora do recorte da imagem do token; evitar `overflow: hidden` no contorno principal do token 2D.
- no modo 2D plano, a imagem do token deve renderizar em 100% do quadro visual. Reservas grandes de raster/scale ficam apenas para 2.5D/billboard, para evitar perda de nitidez ao soltar o clique.
- `tokenStore.setTokens` reaproveita objetos de tokens identicos para evitar redesenhar o mapa em `room:state` que nao alterou tokens.
- tokens podem ocupar 1, 4, 9 ou 16 quadrados, controlados pelo GM.

### Fichas e Modelo de Sistema

Client:

- `features/characters/components/CharactersPanel.tsx`
- `features/characters/components/CharacterEditorModal.tsx`
- `features/characters/components/CharacterSheetTab.tsx`
- `features/characters/components/CharacterSettingsTab.tsx`
- `features/characters/components/CharacterBiographyTab.tsx`
- `features/characters/types/characterSheet.ts`
- `features/game/components/SheetTemplateModal.tsx`
- `features/campaigns/components/CampaignSystemModal.tsx`

Server:

- `characters/characterRoutes.ts`
- `characters/characterService.ts`
- `campaigns/campaignService.ts` para `settingsJson`.

Shared:

- `shared/types/campaignSettings.ts`
- `shared/rules/systemRegistry.ts`
- `shared/rules/systems/types.ts`
- `shared/rules/systems/dnd5e.ts`
- `shared/rules/campaignSettingsRules.ts`

O GM escolhe o sistema pelo catalogo e edita o modelo da campanha na aba de configuracoes. Novas fichas usam esse modelo como base.

Arquitetura de sistemas:

- `CampaignSystemId` define os ids aceitos.
- `CAMPAIGN_SYSTEM_REGISTRY` lista os sistemas cadastrados.
- `AVAILABLE_CAMPAIGN_SYSTEMS` alimenta o modal de selecao.
- `normalizeCampaignSystemId` converte ids desconhecidos ou legado `custom` para `dnd5e`.
- cada sistema define seu proprio `dataKey`; fichas novas salvam dados em `dataJson[system.sheet.dataKey]`.
- calculos de atributo, pericia, salvaguarda e acoes devem consultar o template/sistema ativo quando forem compartilhados entre sistemas.
- detalhes e checklist para novos sistemas ficam em `docs/SISTEMAS.md`.

Categorias da biblioteca de fichas sao editadas no `CharactersPanel`. O GM persiste categorias/atribuicoes em `campaign.settingsJson.characterLibrary`, com cache local apenas como fallback de carregamento. O salvamento remoto usa debounce e tambem faz flush ao desmontar/trocar de tela para nao perder organizacao criada pouco antes de sair do mapa.

### Acoes, Recursos e Barra de Acoes

Client:

- `features/actions/components/ActionEditorSection.tsx`
- `features/actions/components/ActionHotbar.tsx`
- `features/actions/components/ActionPreviewLayer.tsx`
- `features/actions/types/actionTypes.ts`
- `features/actions/utils/actionRolls.ts`
- `features/actions/utils/targetingGeometry.ts`
- `features/actions/store/actionTargetingStore.ts`

Server:

- evento `action:use` em `live/liveSocketHandlers.ts`;
- rolagem e mensagens no chat pelo server.

Shared:

- `shared/types/action.ts`
- `shared/rules/targetingRules.ts`
- `shared/rules/diceRules.ts`

Uso online:

- `action:use` e tratado no servidor e retransmitido para a sala inteira como `action:used`, para que area/alvos aparecam para todos os players.
- efeitos persistentes ficam em `RoomState.activeEffects`; `turn:next` reduz a duracao com `tickRoomActionEffects`.
- magias de invocacao usam `action.summon.characterId` e criam token pelo servidor, com validacao de permissao sobre a ficha invocada.

### Turnos

Client:

- `features/turns/components/TurnTrackerBar.tsx`
- `features/turns/services/turnSocketService.ts`
- `features/actions/components/ActionHotbar.tsx` para passar turno/recuperar recursos.
- `features/characters/components/CharactersPanel.tsx` para iniciar/encerrar turnos e adicionar ficha manualmente na fila.
- `features/characters/components/CharacterEditorModal.tsx` para rolar iniciativa pela ficha e enviar o total para a fila quando houver token vinculado.

Server:

- eventos `turn:*` em `live/liveSocketHandlers.ts`;
- `createDefaultTurnState` e `normalizeTurnState` em `live/liveRoomService.ts`.

Shared:

- `shared/types/turn.ts`

Regras atuais:

- iniciativa rolada pela ficha envia resultado para o chat e usa o total apenas na fila;
- o modificador de iniciativa da ficha nao deve ser sobrescrito pelo total rolado;
- a entrada manual no `CharactersPanel` usa `turn:entry:upsert`, exige token vinculado e respeita controle GM/player no servidor.

### Chat e Dados

Client:

- `features/chat/components/*`
- `features/chat/store/chatStore.ts`
- `features/chat/services/chatSocketService.ts`
- `features/dice/components/DicePanel.tsx`
- `features/dice/services/diceSocketService.ts`

Server:

- eventos `chat:send` e `dice:roll` em `live/liveSocketHandlers.ts`;
- historico de chat em `live/liveRoomService.ts`.

Rolagens podem carregar `ChatMessage.color`, definida pela cor local do jogador em `features/ui/store/uiStore.ts`. Essa cor deve ser sanitizada no servidor antes de ir para o chat. `DiceChatMessage` escreve explicitamente `CRITICO`, `FALHA CRITICA` e `Rolagem secreta do GM`; o card externo em `ChatMessageItem` tambem diferencia a rolagem do GM com fundo/borda proprios.

### Anotacoes

Client:

- `features/annotations/components/AnnotationPanel.tsx`
- `features/annotations/components/AnnotationLayer.tsx`
- `features/annotations/store/annotationStore.ts`

Server:

- eventos `annotation:*` em `live/liveSocketHandlers.ts`;
- anotacoes online em `RoomState.annotations`.

O pincel usa a cor local do jogador como padrao. O store de anotacoes tambem le a preferencia salva para evitar iniciar com cor antiga quando o painel ainda nao foi aberto.

### Audio

Client:

- `features/audio/components/AudioPanel.tsx`
- `features/audio/components/GlobalAudioPlayer.tsx`
- `features/audio/services/audioSocketService.ts`
- `features/audio/utils/audioEmbeds.ts`

Server:

- eventos `audio:*` em `live/liveSocketHandlers.ts`;
- estado em `RoomState.audioState`.

Shared:

- `shared/types/audio.ts`
- `shared/rules/audioRules.ts`

Estado atual: audio aceita YouTube e MP3. Spotify foi removido por instabilidade de autoplay/embed.

Regras atuais:

- todos podem adicionar musicas na fila;
- GM pode reordenar/sobrescrever a fila;
- o player global continua tocando mesmo quando o painel de audio esta fechado;
- pausar e retomar deve manter a posicao da faixa quando o provedor permitir.

### Assets

Client:

- `features/assets/assetApi.ts`

Server:

- `assets/assetRoutes.ts`
- `assets/assetService.ts`
- `assets/migrateBase64Assets.ts`

Use assets persistidos para imagens/audio que precisam sobreviver ao reload e funcionar online.

Fluxo atual:

- client envia imagem/audio para `POST /assets`;
- server salva arquivo por hash em `ASSET_STORAGE_DIR` ou `uploads/assets`;
- server publica os arquivos em `/assets/...`;
- `migrate:assets` converte base64 antigo em arquivo persistido.

## Arquivos Legados Mantidos

Estes arquivos foram mantidos por poderem servir como referencia futura, mas nao fazem parte do fluxo principal atual:

- `apps/client/src/components/ContextMenu.tsx`: menu de contexto prototipo antigo.
- `apps/client/src/features/map/components/GridHighlight.tsx`: highlight simples antigo de grid.
- `apps/client/src/features/tokens/tokenService.ts`: factory local antiga de token.
- `apps/client/src/features/tokens/components/TokenUploader.tsx`: uploader local antigo, sem persistencia.
- `apps/client/src/features/map/utils/bounds.ts`: helper generico antigo de bounds.

Antes de reusar qualquer um deles, compare com o fluxo atual da feature correspondente. Em geral, o fluxo atual passa por stores, socket services e `features/assets`.

## Refactors Conservadores Ja Aplicados

- `parseApiResponse` centralizado em `apps/client/src/core/api/parseResponse.ts`.
- `getRouteParam` centralizado em `apps/server/src/utils/routeParams.ts`.
- acesso de campanha centralizado em `apps/server/src/campaigns/campaignAccess.ts`.
- `clamp` reutilizado a partir de `shared/utils/math.ts` onde o comportamento era identico.
- arquivos legados sinalizados com comentarios curtos.
- scripts `typecheck` e `build` adicionados para client/server/raiz.

## Pontos de Atencao Para Escalar

Alguns arquivos concentram muita responsabilidade. Evite colocar mais regra neles sem antes extrair helpers menores:

- `apps/server/src/live/liveSocketHandlers.ts`: handlers Socket.IO de quase todo o online.
- `apps/server/src/live/liveRoomService.ts`: estado em memoria, persistencia ao vivo e conversoes.
- `apps/client/src/features/map/MapCanvas.tsx`: composicao principal do mapa.
- `apps/client/src/features/actions/components/ActionEditorSection.tsx`: editor completo de acoes/recursos/alvos.
- `apps/client/src/features/characters/components/CharacterSheetTab.tsx`: aba principal da ficha.
- `apps/client/src/features/characters/components/CharactersPanel.tsx`: arvore/categorias de fichas.
- `apps/client/src/features/map/components/MapEditorModal.tsx`: editor de terreno/objetos/parede.

Sugestoes de divisao futura:

- separar `liveSocketHandlers.ts` por dominio (`tokens`, `turns`, `audio`, `chat`, `annotations`);
- mover helpers puros de `MapCanvas.tsx` para `features/map/utils`;
- criar componentes menores para secoes do `CharacterSheetTab`;
- extrair subcomponentes do editor de acoes por tipo de configuracao;
- manter toda regra compartilhada em `shared/rules` sempre que client e server precisarem concordar.

## Regras de Trabalho Em Equipe

- Nao editar arquivos gerados em `apps/server/src/generated/prisma`.
- Nao colocar regra de permissao apenas no client. O servidor deve validar.
- Nao persistir imagens grandes como base64 em JSON. Use `features/assets` e `assets/assetService`.
- Ao criar evento Socket.IO, atualize tipos compartilhados e o hook `useRoomSocketEvents`.
- Ao alterar schema Prisma, criar migracao e documentar impacto.
- Ao alterar modelo de ficha ou sistema, verificar `shared/rules/systems/*`, `systemRegistry.ts`, `campaignSettingsRules`, `characterSheet.ts`, `CharacterSheetTab`, `ActionEditorSection`, `actionRolls.ts` e `docs/SISTEMAS.md`.
- Ao alterar tokens/mapa, verificar permissao GM/player e persistencia em `liveRoomService`.
- Rodar `npm run typecheck` antes de entregar.
- Rodar `npm run build:client` quando alterar UI.

## Checklist Antes de Entregar Mudancas

1. TypeScript passa no client e server.
2. O fluxo online foi validado ou revisado no server.
3. Arquivos grandes nao receberam mais responsabilidade sem necessidade.
4. Nomes de tipos/payloads foram atualizados em `shared`.
5. Assets novos usam upload/persistencia, nao base64 solto.
6. GM/player foram considerados nas regras de permissao.
7. Documentacao foi atualizada quando a estrutura mudou.
