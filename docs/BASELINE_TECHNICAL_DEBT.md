# Dívida técnica: configurações de campanha

Registrada durante a estabilização anterior ao 3D.

- `Campaign` não declara `settingsJson` no schema Prisma.
- A migration `20260604120000_add_campaign_settings` adiciona `settings_json`.
- A migration `20260910000105_sync_schema` remove essa coluna.
- `campaignService.ts` utiliza SQL direto e recria a coluna com
  `ADD COLUMN IF NOT EXISTS` durante a execução.
- Na consulta somente de leitura da análise inicial, a migration de remoção
  constava como aplicada e a coluna existia no PostgreSQL.

Uma recriação da coluna não recupera valores removidos. Não foi possível
determinar perda histórica de dados. A correção precisa de uma tarefa separada,
com avaliação do histórico de migrations, backup e estratégia de preservação
dos dados existentes.

Esta estabilização não altera o schema, migrations, colunas ou o serviço de
configurações da campanha, nem executa migrations.
