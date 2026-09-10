# Fechamento da PHASE 0/1

Validação em 10/09/2026, na branch `feat/scene-3d`. Escopo limitado à fundação do renderer e aos tokens/ações da PHASE 1. Nenhuma implementação de PHASE 2.

## Estado encontrado

O HEAD local e `origin/feat/scene-3d` apontavam para `0cf2820cb9f74684dd74c91d505214d73526c05b` (`chore: stabilize baseline before 3d`). Não havia WIP no histórico nem no reflog local. A implementação estava preservada no diretório de trabalho: 24 arquivos, incluindo os arquivos novos, em vez dos 23 mencionados na solicitação.

Esse conteúdo foi registrado, sem reescrever a implementação, no checkpoint `b4c5103` (`wip: preserve phase 0 and 1 implementation`). As correções e evidências desta revisão ficam no commit seguinte, `fix: finalize phase 0 and 1 validation`. O hash final pode ser consultado com `git log -2 --oneline`.

## A. Funcionamento confirmado

- Seleção local de modo 2D, 2.5D e 3D; preferência 3D preservada na recarga.
- Carregamento lazy do renderer: o teste de rede não solicitou `Scene3DCanvas.tsx` durante a entrada inicial em 2D; o build separou o renderer em outro chunk.
- PerspectiveCamera, enquadramento do mapa, foco no token, orbit, pan e zoom.
- Background centralizado com proporção `contain`, orientação equivalente ao plano 2D e grid de uma unidade por célula.
- Conversão centralizada: coordenadas legadas x/y são o canto superior esquerdo em pixels; X/Z são o centro do token em células; Y é a elevação em pés dividida por cinco. A conversão considera toda a dimensão do token.
- Tokens planos e standees/billboards, prioridade de `sprite25dImage` no modo em pé, elevação, seleção, menu, drag, snap e clamp da dimensão inteira.
- Cancelamento do drag com Escape, verificação de controle/turno e reutilização de `token:move` e `token:visual:update`.
- Targeting usa as regras compartilhadas existentes. Elevação é visual e não modifica distância, alcance, cobertura ou combate.
- Dois navegadores com ingresso autenticado pelo handler real `campaign:join-live`: GM 3D → player 2D e player 3D → GM 2D; atualização de elevação, recarga e recebimento do estado da sala.
- Arraste na visualização privada do GM não gera broadcast de movimento. Anotações exclusivas do GM são removidas do estado entregue ao player pelo filtro existente.
- Mapas com Fog, terreno, paredes, objetos, imagens em camadas ou anotações exigem retorno ao 2D. Ferramentas de Fog/anotação ativas também bloqueiam o Canvas. Isso evita apresentar uma versão incompleta dessas camadas no 3D.
- Imagem inexistente aciona a tela de erro com retorno ao 2D.

## B. Arquivos criados desde o baseline

Em `apps/client/src/features/scene3d/`:

```text
actions/ActionPreview3D.tsx
camera/SceneCamera.tsx
components/Scene3D.module.css
components/Scene3DCanvas.tsx
components/Scene3DErrorBoundary.tsx
components/Scene3DGate.tsx
components/Scene3DLoadingOverlay.tsx
interactions/SceneInputController.tsx
map/Grid3D.tsx
map/GroundPlane3D.tsx
tokens/Token3D.tsx
types.ts
utils/coordinates3d.ts
utils/sceneCompatibility.ts
```

Testes e documentação:

```text
apps/client/tests/scene3d.test.ts
apps/client/tests/scene3d.browser.html
apps/client/tests/scene3d.fixture.tsx
apps/client/tests/scene3d.browser.mjs
apps/server/tests/scene3dSocketFixture.mjs
docs/SCENE3D_PHASE01_VALIDATION.md
```

## C. Arquivos existentes modificados desde o baseline

```text
apps/client/package.json
apps/client/src/features/game/components/GameSettingsPanel.tsx
apps/client/src/features/map/MapCanvas.tsx
apps/client/src/features/tokens/components/TokenContextMenu.tsx
apps/client/src/features/tokens/components/TokenContextMenu.module.css
apps/client/src/features/ui/store/uiStore.ts
package.json
package-lock.json
```

O backend de produção, `shared` e Prisma permanecem sem alterações em relação a `0cf2820`. Nenhuma migration, SQL, alteração de schema ou modificação de dados reais foi executada.

## D. Dependências

| Dependência adicionada ao client | Versão |
| --- | --- |
| three | 0.170.0 |
| @react-three/fiber | 8.18.0 |
| @react-three/drei | 9.122.0 |
| @types/three, desenvolvimento | 0.170.0 |
| tsx, desenvolvimento, já utilizado no servidor | 4.21.0 |

O override de `@types/three` fixa também os tipos transitivos em 0.170.0, evitando duas definições incompatíveis de objetos Three. React/ReactDOM continuam em 18.3.1 e Prisma em 7.8.0. O pareamento de React 18 com R3F 8 segue a [orientação oficial do R3F](https://github.com/pmndrs/react-three-fiber#readme).

Nenhuma dependência extra ficou adicionada no fechamento. Um patch do R3F foi investigado e descartado após os testes passarem com o pacote original. Playwright é fornecido pelo ambiente de testes, não pelo bundle da aplicação.

## E–G. Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm ls --depth=0` | Exit 0, sem dependências inválidas/extraneous |
| `npm run test:scene3d -w client` | 20/20 passaram |
| `npm run test:baseline -w server` | 15/15 passaram, conforme contagem do runner |
| `npm run typecheck` | Client e server: exit 0 |
| `npm run build` | Client e server: exit 0 |
| `git diff --check` | Sem erros de whitespace |

Build final: principal 508,02 kB / 147,96 kB gzip; renderer lazy 901,34 kB / 239,41 kB gzip; CSS 158,32 kB / 32,47 kB gzip. O aviso do Vite sobre chunks acima de 500 kB permanece. O Node 26.8.2 também emitiu aviso de depreciação de `module.register()` usado pelo tsx; isso não impediu os testes.

## H. Validação visual e integração

Executada com Edge/Chromium headless, viewport 1280×900, WebGL por SwiftShader, React StrictMode, MapCanvas/stores/estilos reais e dados de teste. Houve inspeção da captura visual do mapa com quadrantes coloridos, grid e tokens.

O roteiro testa alternância repetida de modos, sobrevivência da cena além da janela de descarte de 500 ms, geometria e proporção do fundo, orientação, foco/orbit/pan/zoom, grid, sprite versus portrait, posição de tokens 1×1 e 2×2, elevação, menu, drag, cancelamento, snap, clamp nas duas extremidades, controle do player e turno, confirmação de área e círculos de alcance normal/longo, troca de mapId, modo privado e retorno ao 2D. Também testa Fog/objetos não suportados e recuperação de erro de imagem.

A integração abre dois contextos de navegador independentes, usando Socket.IO e os handlers de produção. As consultas e escritas Prisma alcançadas por esses cenários são simuladas em memória; verificam-se as chamadas de persistência de posição/visual. A entrada na campanha, broadcasts e listeners do frontend são reais. A recarga valida restauração a partir da sala em memória, não durabilidade após reiniciar um servidor com PostgreSQL.

Passou sem exceções JavaScript nos cenários normais. O teste de imagem ausente provoca deliberadamente o erro que deve ser capturado pelo fallback. Um aviso React preexistente sobre `fetchPriority` no MapBackground 2D foi observado e deixado fora deste escopo.

Reprodução, com o servidor Vite local em execução e Playwright disponível no ambiente:

```powershell
npm run dev:client
$env:PLAYWRIGHT_MODULE_PATH = 'C:\caminho\para\node_modules\playwright'
$env:PLAYWRIGHT_CHANNEL = 'msedge'
$env:SCENE3D_TEST_URL = 'http://localhost:5173'
$env:SCENE3D_SCREENSHOT = Join-Path $env:TEMP 'scene3d-foundation.png'
npm exec -w client -- tsx tests/scene3d.browser.mjs
```

O helper Socket.IO abre sua própria porta efêmera em 127.0.0.1 e encerra ao final. O roteiro não depende do servidor real na porta 3001 nem de banco real. A fixture HTML não é uma entrada do build de produção.

## I. Correções deste fechamento

- Loading de texturas isolado por Suspense dentro do Canvas; câmera e raiz WebGL permanecem montadas durante esse carregamento.
- Adicionado o círculo de alcance normal junto ao de alcance longo, seguindo o preview 2D existente. Nenhuma regra de targeting foi alterada.
- Menu de token reposicionado com base em suas dimensões reais e no viewport, inclusive ao redimensionar a janela. O botão final permanece acessível perto das bordas. A correção também beneficia o menu compartilhado em 2D.
- Corrigida a espera assíncrona do teste visual, que antes podia avançar com uma cena ainda indisponível.
- Corrigida a fixture da ficha para usar `dnd5e.visual.sprite25dImage` e `dnd5e.hitPoints`, com sprite diferente do portrait; carregados os estilos reais da aplicação.
- Acrescentadas regressões de câmera, limites, alcance, sincronização, recarga e anotação privada.

## J. Limitações e dívida técnica

- PHASE 1 é um renderer de mapa plano com tokens elevados. Não há terreno/parede 3D, Fog 3D, editor, GLB, física, portas, andares ou MapLayerConfig V2.
- Mapas com camadas não suportadas bloqueiam a cena e orientam retorno ao 2D; não escondem silenciosamente essas camadas.
- A preparação privada do GM mantém o comportamento anterior: arraste local não é publicado nem persistido como edição privada de tokens. A atualização de uma sala ativa pode repor seu estado; não há um novo sistema isolado de edição privada nesta fase.
- O protocolo de movimento mantém atualização otimista, sem ACK de aprovação. Reconciliação de rejeições/perda de conexão continua sendo uma limitação do fluxo existente.
- A restrição de Fog no renderer não equivale a uma auditoria completa de segurança dos dados enviados pelo backend. Nenhum modelo novo de objetos secretos foi introduzido.
- Ações e distâncias continuam no plano legado. Seleção múltipla por retângulo, waypoints/medição de caminho e ferramentas de desenho continuam no 2D. PV/condições no 3D aparecem no rótulo do token selecionado.
- Adição de fichas/imagens por drag-and-drop exige modo 2D nesta entrega.
- Arquivo de imagem inválido impede aquela cena 3D até corrigir a referência; o fallback permite voltar ao 2D.
- Não foram validados GPU física, celular/touch, múltiplos browsers de fabricantes diferentes, centenas de tokens, todos os assets remotos nem durabilidade no PostgreSQL real. Não foi executada nova instalação limpa com `npm ci` nesta revisão.
- A divergência `campaign.settings` / `settings_json` permanece separada em `BASELINE_TECHNICAL_DEBT.md`.

## K. Checklist manual na campanha real

1. Em uma campanha de teste sem Fog/camadas extras, entre como GM e player em perfis/janelas independentes.
2. Com cache vazio em 2D, confira na aba Network que o chunk Scene3DCanvas só é solicitado ao selecionar 3D. Alterne 2D → 2.5D → 3D → 2D várias vezes.
3. Confira norte/topo do mapa, proporção do background, alinhamento do grid, enquadramento, foco, roda para zoom, botão do meio para orbit e direito no chão para pan.
4. Compare tokens 1×1, 2×2 e maiores entre modos. Teste imagem normal, sprite25dImage, Auto/Plano/Em pé e elevação de 0, 5 e 10 ft.
5. Arraste até cada borda, confira snap e dimensão inteira dentro do mapa; cancele outro arraste com Escape. Abra o menu junto às quatro bordas e redimensione a janela.
6. Confira controle de ficha própria/alheia e turno ativo. Movimente GM 3D → player 2D e depois player 3D → GM 2D; altere elevação e modo visual.
7. Use ações de alvo único, área, cone, linha e alcance normal/longo. Compare os mesmos alvos e custos com 2D.
8. Troque mapas com proporções e tamanhos diferentes. Abra um mapa de preparação do GM e confirme que um arraste privado não aparece no mapa ativo do player; não trate esse arraste como persistência privada.
9. Ative Fog/camadas/anotações e confira o bloqueio do 3D e o botão Voltar ao 2D. Confira uma anotação exclusiva do GM no perfil do player.
10. Recarregue as duas páginas: modo local, posição, tamanho, elevação e visual devem ser recuperados. Em ambiente de teste apropriado, reinicie o backend e confira a persistência real no PostgreSQL.
11. Teste seus backgrounds/sprites externos e o comportamento de imagem ausente ou WebGL indisponível.

## L. Commits

- Baseline: `0cf2820cb9f74684dd74c91d505214d73526c05b`.
- Checkpoint da implementação encontrada: `b4c5103`.
- Fechamento: commit seguinte com mensagem `fix: finalize phase 0 and 1 validation`; hash entregue no relatório da tarefa.

Sem merge em main e sem PHASE 2.
