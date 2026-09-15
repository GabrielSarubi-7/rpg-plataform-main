# PHASE 6 — combate no renderer 3D

Validação: 2026-09-15. Branch `feat/scene-3d`; base `61fcaf0ea20a31f6925c0feefab42890c2891c94`.
O trabalho foi encontrado no working tree, sem um commit WIP adicional, e continuado sem reiniciar as fases anteriores.

## Implementado

- Volumes transparentes para sphere, cone, line, cube, cylinder e emanation/self/melee, mantendo o desenho horizontal de referência e os tokens afetados pelo targeting atual.
- Preview de alcance normal/longo, trajetória, impacto e destaque na elevação visual dos tokens, inclusive footprints maiores que 1x1.
- Projétil/pulso e indicação transitória de direção via `action:used`. Animação por refs/useFrame; sem Zustand/React state por frame e sem persistência de animação.
- Medição por dois cliques no chão ou tokens: horizontal pela função existente, diferença de elevação e distância espacial opcional identificada como informativa. Esc limpa; medição não move tokens nem confirma ações.
- Painel com resultados reais do chat, incluindo crítico, cura, dano e salvaguardas, e duração dos efeitos por turnos. Não há nova rolagem ou resolução de combate no renderer.
- `activeEffects` existente renderizado e filtrado por referências/posições autorizadas. Players não recebem efeitos que referenciem tokens ocultos; requisições player com referências proibidas são rejeitadas antes de rolagens/invocação.
- Invocações usam a autorização e criação de tokens por ficha já existentes; posição/snap e elevação padrão permanecem os do fluxo atual.
- Eventos de ação identificam o mapa; previews descartados ao trocar mapa e ocultados em preparação privada. Efeitos não atravessam uma troca do mapa ativo no reload da sala.
- Timers de preview são removidos no cleanup; efeitos transitórios limitados/deduplicados. Geometrias descartadas ao terminar, verificado em navegador.

Não foram alterados `targetingRules`, regras de dados/crítico, consumo/recuperação de recursos ou fórmulas de distância. Elevação não virou regra de alcance/dano. O clique 3D continua convertido de X/Z para o mapa e confirmado por `MapCanvas.confirmActionAtPoint`, usado no 2D.

## Correções durante o fechamento

- Altura do preview em alvos elevados e raio melee separado do raio de outras áreas.
- Animação começa no primeiro frame próprio, evitando saltar ao final após um período ocioso do renderer por demanda.
- Background explicitamente vazio permanece vazio após normalizações sucessivas; atualizações de cena não restauram `/mapa.jpg` quando a visibilidade ocultou o background.
- Fixture HTTP de combate entrega a ficha controlada; esperas de testes acompanham a montagem do renderer e a entrada no modo de targeting.

## Testes executados

Todos passaram:

- Cliente: **44 testes** (`npm run test:scene3d -w client`), incluindo 15 de PHASE 6: dez formatos, paridade de targeting com elevação/footprint, alcance normal/longo/inválido, medição, referências ocultas, recursos/recuperação por turno e preparo das expressões de crítico/cura/salvaguarda.
- Servidor: **3 cenários de integração** (`npm run test:scene3d -w server`). O cenário 6 usa dois clientes Socket.IO reais, resultados de rolagem controlados, dano/cura/saving throw/crítico, efeitos de dois turnos, negação fora de turno, summon permitido/negado, reload, mudança de mapa e ausência de referências secretas em eventos/chat.
- Segurança do baseline: **15 testes** (`npm run test:baseline -w server`).
- Edge headless/WebGL SwiftShader: `scene3d.browser.mjs`, `scene3d.phase23.browser.mjs`, `scene3d.phase45.browser.mjs` e `scene3d.phase6.browser.mjs`.
- Navegador PHASE 6: dez previews, confirmação pelo clique real no MapCanvas, efeito recebido em GM/player, resultado de cura no chat, dispose, medição de elevação, efeito persistente, invocação, remoção de efeitos ao ocultar alvo, 3D→2D→3D, mapa privado e reload.
- Regressões: tokens/câmera/targeting, Fog, editor/TransformControls, GLB seguro/upload/deduplicação, portas/visão, floors, luzes e bookmarks.
- `npm run typecheck`, `npm run build`, `npm ls --depth=0` e `git diff --check`.

O chunk lazy 3D ficou em **270,93 kB gzip**. Sem novas dependências. Build mantém o aviso de chunks maiores que 500 kB e o runtime de testes emite aviso de depreciação de `module.register()`.

## Limites e compatibilidade

- Volumes, projéteis e facing são apresentação visual; não há targeting 3D autoritativo, física, nova regra vertical ou nova aplicação automática de PV.
- Resultados e follow-up de dano crítico continuam no chat existente. Não foram criados números de dano fictícios nem um segundo motor de combate.
- Efeitos persistentes mantêm o ciclo atual da sala: sobrevivem ao reload da página/sala no mesmo mapa enquanto o processo está ativo; não foi adicionada persistência após reinício do servidor.
- Filtragem é conservadora: se uma referência ou posição do efeito não puder ser conhecida pelo player, o efeito completo é omitido. O GM continua recebendo o estado completo.
- Testes de persistência usam o adaptador Prisma simulado. Não houve migration nem uso do PostgreSQL real da campanha; validar também em mesa real é complementar.
- Sem PHASE 7/8, alterações em `schema.prisma` ou `campaign.settings_json`.

## Checklist manual complementar

1. Entrar como GM e player; usar a hotbar com melee, ranged normal/longo e cada AoE. Conferir destaques e o mesmo resultado no 2D.
2. Medir dois tokens com alturas e tamanhos diferentes; ligar a distância espacial e conferir que ela não muda o alcance da ação.
3. Usar ataque, dano crítico pelo follow-up, cura e salvaguarda; conferir chat, recursos e recuperação na troca de turno.
4. Criar efeito de dois turnos e invocar uma ficha permitida; trocar turnos, ocultar um alvo, trocar mapa e recarregar.
5. Conferir que invocação/posição permanecem ao voltar ao 2D e que preparação privada não recebe efeitos do mapa ativo.

Para reproduzir os testes de navegador: iniciar Vite na porta 5176, configurar `SCENE3D_TEST_URL`, `PLAYWRIGHT_CHANNEL=msedge` e, se necessário, `PLAYWRIGHT_MODULE_PATH`; executar `npm exec -w client -- tsx tests/scene3d.phase6.browser.mjs`.
