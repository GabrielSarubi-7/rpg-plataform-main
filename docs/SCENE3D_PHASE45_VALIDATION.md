# PHASES 4/5 — validação de fechamento

Data: 2026-09-14. Branch `feat/scene-3d`, base `b9666ec90f955cd18be1075c4fc98229b58e3151`.
O trabalho foi encontrado no working tree, não em um commit WIP. A entrega parte da base acima e preserva as PHASES 0–3.

## Implementação presente

- Ambiente com luz ambiente/direcional, point/spot, limites de sombras e qualidade low/medium/high.
- Editor de luzes, andares e portas; persistência em `layerConfigJson` e sincronização Socket.IO.
- Portas closed/open/locked/destroyed/blocked, hinge/openAngle e animação. Servidor verifica controle de token, distância, permissão e transição para players.
- Bookmarks de câmera com posição, alvo, FOV e transição.
- Normalização de `visionJson`/`lightJson` já existentes no MapToken. Não há migration ou alteração de schema.
- LOS geométrico X/Z com alcance, cone, altura, paredes, portas e objetos bloqueadores. Bloqueio de luz separado de sombras gráficas.
- RoomState individual, objetos/tokens secretos filtrados no servidor, referências relacionadas protegidas, visão recalculada por evento e cache de resultados.
- Inspeção de visão do jogador pelo GM e isolamento das edições em mapas privados.

## Correções no fechamento

- Colisão no evento `token:move`, em vez de criação.
- Filtragem de referências ocultas nos resumos automáticos e notificações de fichas.
- Players não podem substituir tokens arbitrariamente e contornar campos de visão; criação pela ficha permanece disponível.
- Normalização de campos opcionais consistente com o JSON persistido.
- Limpeza da inspeção/andar/bookmark ao trocar de mapa e reativação do mesmo bookmark.
- Revalidação de papéis da campanha mesmo com LOS desligado; publicações antigas são descartadas após substituição da sala.
- Histórico protegido também quando nenhuma sessão player está conectada.
- Fixture de persistência conserva o background inicial; o reload não aponta mais para uma imagem padrão inexistente.

## Evidências

Passaram 29 testes do cliente, 2 cenários de integração Socket.IO e 15 testes de segurança. A integração 4/5 cobre autorização, cinco estados de portas, colisão, LOS, mudanças de alcance/posição, persistência, mapas privados, inspeção e histórico protegido após excluir um token oculto e conectar outro player.

`npm run typecheck`, `npm run build` e `npm ls --depth=0` passaram. O renderer permanece lazy, aproximadamente 268 kB gzip. O build mantém o aviso de chunks acima de 500 kB. Nenhuma dependência adicionada.

A limitação inicial de execução do `tsx` no sandbox foi resolvida pela atualização das permissões do ambiente pelo usuário, sem alteração de runtime ou dependências do projeto.

Passaram os três scripts de navegador no Edge headless/WebGL SwiftShader, com sessões GM/player isoladas e Socket.IO real:

- `scene3d.browser.mjs`: lazy loading, troca 2D/2.5D/3D, câmera, tokens, drag/snap/clamp, targeting, permissões/turno, Fog, mapa privado e reload.
- `scene3d.phase23.browser.mjs`: editor/inspector/TransformControls, GLB upload/deduplicação/carregamento/rejeição, preservação de scene3d em saves legados e descarte de recursos.
- `scene3d.phase45.browser.mjs`: criação/sincronização de luz, auto-hide e override GM, portas e animação, tokens/objetos secretos, visão/luz do token, reativação do mesmo bookmark e persistência após reload.

## Comandos de reprodução

```powershell
npm run test:scene3d -w client
npm run test:scene3d -w server
npm run test:baseline -w server
npm run typecheck
npm run build
npm ls --depth=0
```

Com Vite na porta 5176 e Playwright disponível:

```powershell
$env:SCENE3D_TEST_URL='http://localhost:5176'
$env:PLAYWRIGHT_CHANNEL='msedge'
npm exec -w client -- tsx tests/scene3d.browser.mjs
npm exec -w client -- tsx tests/scene3d.phase23.browser.mjs
npm exec -w client -- tsx tests/scene3d.phase45.browser.mjs
```

Se Playwright não estiver no node_modules do projeto, configurar `PLAYWRIGHT_MODULE_PATH` para o módulo instalado no ambiente de testes. As fixtures usam Socket.IO real e persistência Prisma simulada; não acessam o PostgreSQL da campanha. Confirmar também o reload na campanha real antes de uso em mesa.

## Limitações da primeira versão

- LOS é aproximação por segmentos/volumes simples em X/Z, não raytracing ou targeting 3D autoritativo.
- Floor é atribuição de objetos e faixa de elevação; não há navegação física entre andares.
- Com LOS ligado, o background integral não é enviado ao player. Evita revelar áreas ocultas pelo arquivo completo; não há geração de tiles de imagem recortados.
- Não há memória persistente de exploração. Inspeção GM é uma fotografia solicitada da visão do jogador.
- Efeitos persistentes de ações são omitidos da visão player com LOS ativo nesta versão conservadora.
- Sombras: nenhuma em low, direcional em medium, até duas em high; PointLights não projetam sombras.
- Sem novas regras de combate, Phase 6, física, migrations ou alteração de `campaign.settings_json`.

## Checklist manual complementar na campanha real

- GM/player: criar e editar luz point/spot; recarregar e conferir valores nas duas sessões.
- Portas: testar cinco estados, animação/hinge, player autorizado próximo, player distante e token sem permissão; conferir colisão e LOS.
- Parede e objeto blocksVision escondem entidades atrás deles; movimento e abertura de porta recalculam visão.
- Conferir payloads de join/RoomState/eventos: ausência de token oculto e objeto GM-only.
- Andar superior esconde automaticamente; GM consegue mostrar todos; objetos atribuídos acompanham o andar.
- Ativar o mesmo bookmark duas vezes após mover a câmera; confirmar posição/alvo/FOV.
- Alterar visão/luz do token; reload; trocar mapa; editar mapa privado sem contaminar o mapa ativo.
- Alternar 2D/2.5D/3D; editor/GLB, Fog/terreno preservando scene3d, targeting e tokens das fases anteriores.
