# PHASE 2 e PHASE 3 — implementação e validação

Base: `3cfad46cfb5c1d598dacc10f65bc61018d0a3ed4`, branch `feat/scene-3d`.

## Entrega

- MapLayerConfig V2 e Scene3DConfig compartilhados, com normalização de valores, limites, IDs, transformações e visibilidade conservadora.
- `scene3d` preservado em normalizeMapLayerConfig, cloneLayerConfig, pruneLayerConfig, withFogOfWar, REST e Socket.IO. Os helpers do editor 2D foram extraídos para testes sem alterar suas regras de poda.
- Saves legados preservam a cena armazenada mais recente. Operações por mapa são serializadas no processo do servidor; o editor usa operações granulares com ACK e revisão. Saves sem alteração são idempotentes.
- Terreno positivo/negativo, paredes, objetos legados simplificados, MapImages e anotações existentes no renderer 3D. Terreno/paredes/objetos repetidos e máscara de Fog usam InstancedMesh.
- Fog manual existente: máscara 3D e filtragem conservadora de geometria/tokens. Players recebem apenas objetos de cena públicos. Mudanças de público para secreto retiram o objeto do estado e do renderer do player.
- Editor GM/owner: biblioteca de primitivas, seleção por clique/lista, TransformControls, mover/rotacionar/escalar, snap, inspector, duplicar, deletar, upload GLB e salvar. A barra lateral é recolhida durante a edição e restaurada ao sair.
- Transformação durante arrasto é local; apenas a conclusão é persistida. Escape/blur cancelam. Controles, modelos e texturas de MapImages têm descarte explícito.
- Revisão final: descarte inclui cenas secundárias do GLB, imagens compartilhadas fechadas uma única vez e esqueletos próprios de cada instância. Teste de navegador verifica descarte da geometria ao deixar a cena.
- GLB: autenticação no upload, MIME/extensão, magic, versão/comprimento/chunks, recursos internos e limites estruturais. SHA-256 e deduplicação mantidos. Loader valida novamente e usa placeholder em falhas. Recursos de modelos repetidos são compartilhados até o último consumidor sair.
- Atualizações da mesa ao vivo não substituem a cena privada em preparação pelo GM.
- Nenhuma dependência adicionada ou atualizada. Three 0.170.0, R3F 8.18.0, Drei 9.122.0 e React 18 preservados.
- Nenhuma migration ou alteração de schema.prisma. `campaign.settings_json` continua como dívida técnica separada. PHASE 4 não implementada.

## Verificação automatizada

- `npm run test:scene3d -w client`: 24 testes, incluindo coordenadas/targeting existentes, migração em memória V1→V2, clones independentes, poda, Fog, filtros e GLB inválido.
- `npm run test:baseline -w server`: 15 testes de segurança existentes.
- `npm run test:scene3d -w server`: integração com dois clientes Socket.IO; autorização, uploads inválidos autenticados, CRUD, segredo, mapa privado, saves antigos via REST/Socket e gravações concorrentes.
- `npm run typecheck`, `npm run build`, `npm ls --depth=0`: sucesso. Vite mantém o aviso de chunk acima de 500 kB; renderer 3D continua lazy, aproximadamente 264 kB gzip.
- `apps/client/tests/scene3d.browser.mjs`: regressão de alternância 2D/2.5D/3D, lazy loading, câmera, tokens, elevação, drag/snap/clamp, targeting, GM/player/turnos, contexto, dois clientes e reload.
- `apps/client/tests/scene3d.phase23.browser.mjs`: editor real, inspector, arrasto pelo gizmo com persistência somente no fim, CRUD, filtro de segredos no segundo navegador, GLB real via upload/loader, deduplicação, rejeição e placeholder, camadas legadas, saves de terreno/Fog preservando cena, reload e preparação privada.

Os testes de navegador usam Edge headless com WebGL/SwiftShader. Os handlers de produção e o armazenamento de arquivos temporários são reais; os delegates Prisma são substituídos por memória. **O PostgreSQL de produção não foi acessado nem validado.**

Para reproduzir os testes de navegador, iniciar `npm run dev -w client -- --port 5176`, fornecer Playwright por `PLAYWRIGHT_MODULE_PATH` e usar `PLAYWRIGHT_CHANNEL=msedge`, `SCENE3D_TEST_URL=http://localhost:5176`. Executar cada script com `npm exec -w client -- tsx tests/<arquivo>.mjs`.

## Limitações desta entrega

- GLB autossuficiente e estático: até 24 MiB, 2.000 nós, 5.000 primitivas e 2 milhões de vértices renderizados por arquivo. Texturas internas PNG/JPEG até 4096×4096, orçamento agregado de 32 milhões de pixels. Extensões, Draco/KTX2, referências externas e accessors sparse são rejeitados nesta versão. `.gltf` com arquivos separados não é aceito.
- Modelos são ajustados a uma unidade, com pivô na base; escala no inspector define o tamanho final. Animações de modelos não são reproduzidas.
- Pintura de terreno/Fog e criação/edição de anotações continuam nos controles 2D existentes; o 3D exibe os resultados. O Fog não é visão dinâmica e oculta objetos inteiros quando sua área conservadora toca uma célula escondida.
- Alturas continuam absolutas em pés no legado. Tokens não ganham física, colisão ou ajuste automático ao piso. Objetos legados usam formas aproximadas; suas regras de jogo não foram alteradas.
- Editor requer campanha/mapa persistente e conexão autenticada; salas temporárias não têm editor persistente. Edições simultâneas do mesmo objeto seguem a última gravação aceita. A serialização atual pressupõe um único processo de servidor, como a infraestrutura existente de salas em memória.
- Arquivos `/assets` continuam sob o modelo público existente: filtros evitam divulgar URLs de objetos secretos, mas não revogam um URL que já tenha sido publicado. Imagens de fundo e mensagens de combate mantêm o comportamento de compartilhamento existente.
- Desempenho em mapas máximos e GPUs reais deve ser verificado no hardware de uso; não há LOD, física, iluminação editável ou funcionalidades da PHASE 4.

## Checklist manual no ambiente real

1. Abrir um mapa antigo com terreno, parede, imagens, anotações e Fog; alternar 2D → 2.5D → 3D → 2D e conferir tokens/alturas.
2. Como GM/owner, abrir Editor 3D; adicionar primitivas, selecionar por clique, mover/rotacionar/escalar por gizmo e inspector, testar snap/Escape, duplicar e deletar.
3. Enviar um GLB autossuficiente compatível; repetir o upload; tentar um arquivo inválido e conferir que a mesa continua utilizável.
4. Salvar, recarregar e conferir a cena no PostgreSQL real. Editar terreno e Fog pelo 2D, salvar novamente e confirmar que todos os objetos 3D permanecem.
5. Entrar como player em outro navegador: conferir sincronização, ausência do editor e de objetos GM/ocultos. Tornar um objeto público secreto e conferir sua retirada imediata.
6. Preparar um mapa privado enquanto o segundo cliente movimenta tokens na mesa ativa; conferir isolamento e persistência. Ativar o mapa preparado e conferir a visão do player.
7. Conferir seleção/menu de tokens, movimentação, turnos e targeting no 3D; sair e retornar ao 2D sem perder posições.
