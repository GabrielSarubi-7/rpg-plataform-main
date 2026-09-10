# Sistemas de RPG

O projeto trata "sistema" como um modulo registrado, nao como texto livre. A
meta e permitir que D&D 5e, Ordem Paranormal, Transpassavel e outros sistemas
tenham atributos, pericias, recursos, calculos e dados de ficha diferentes sem
quebrar o online.

## Estado atual

Sistema disponivel:

- `dnd5e`: Dungeons & Dragons 5e.


## Arquivos principais

- `shared/types/campaignSettings.ts`: tipos persistidos em
  `campaign.settingsJson`, incluindo `CampaignSystemId`,
  `CampaignSheetTemplate`, atributos, recursos e secoes customizadas.
- `shared/rules/systems/types.ts`: contrato de um sistema registrado.
- `shared/rules/systems/dnd5e.ts`: primeiro modulo real de sistema. Serve como
  exemplo de template, atributos, pericias, layout e regras.
- `shared/rules/systemRegistry.ts`: fachada do catalogo. Exporta
  `CAMPAIGN_SYSTEM_REGISTRY`, `AVAILABLE_CAMPAIGN_SYSTEMS`,
  `getCampaignSystemDefinition`, `createCampaignSheetTemplate` e helpers.
- `shared/rules/campaignSettingsRules.ts`: cria e normaliza settings da
  campanha usando o template do sistema ativo.
- `apps/client/src/features/characters/types/characterSheet.ts`: normaliza,
  aplica e salva a ficha usando o `dataKey` do sistema ativo.
- `apps/client/src/features/actions/utils/actionRolls.ts`: monta formulas de
  acao usando o template ativo quando existe.
- `apps/server/src/characters/characterService.ts`: cria novas fichas usando o
  sistema da campanha.
- `apps/server/src/live/liveSocketHandlers.ts`: regras online que precisam ler
  ficha usam o namespace do sistema quando possivel.

## Fluxo

1. A UI abre `CampaignSystemModal`.
2. O modal lista `AVAILABLE_CAMPAIGN_SYSTEMS`.
3. Ao criar ou alterar campanha, o client envia `systemPreset`.
4. O server chama `createDefaultCampaignSettings(systemPreset)`.
5. `normalizeCampaignSystemId` aceita apenas sistemas registrados e converte
   legado/valor desconhecido para `dnd5e`.
6. O template da campanha guarda `sheetTemplate.preset`.
7. Novas fichas sao criadas com `characters.system`,
   `character_sheets.system` e `dataJson.system` iguais ao sistema ativo.
8. Os dados especificos da ficha ficam em `dataJson[system.sheet.dataKey]`.

Para D&D 5e, o `dataKey` e `dnd5e`, entao fichas antigas continuam abrindo.

## Como adicionar um sistema novo

1. Crie um arquivo em `shared/rules/systems/<sistema>.ts`.
2. Exporte uma constante `<SISTEMA>_SYSTEM` seguindo
   `CampaignSystemDefinition`.
3. Defina um `id` estavel, por exemplo `ordemParanormal`.
4. Defina um `dataKey` estavel, por exemplo `ordemParanormal`.
5. Defina `sheetTemplate` com atributos, PV/vida base, defesa, recursos
   iniciais e secoes customizadas iniciais.
6. Defina `skills` com a lista de pericias do sistema.
7. Defina `rules`:
   - `abilityScoreMode`: `dnd5e_modifier`, `flat_value`, `dice_pool` ou
     `custom`;
   - `skillMode`: `dnd5e`, `ranked`, `flat` ou `custom`;
   - `deathSaveMode`: `dnd5e`, `none` ou `custom`;
   - `initiativeAbility`, `defenseLabel`, `rollFormula` e `hitPointMode`.
8. Importe o modulo em `shared/rules/systemRegistry.ts` e adicione em
   `CAMPAIGN_SYSTEM_REGISTRY`.
9. Atualize `CampaignSystemId` em `shared/types/campaignSettings.ts` se quiser
   autocomplete estrito para o novo id. O tipo ja aceita ids registrados em
   runtime, mas declarar o literal ajuda outros devs.
10. Se o sistema precisar de tela propria, crie componentes/adaptadores no
    client e escolha pelo `sheetTemplate.preset`.
11. Revise rolagens de acao em `actionRolls.ts`; atributo de ataque/dano deve
    funcionar com as chaves do novo sistema.
12. Se o sistema tiver calculos online proprios, coloque a regra em `shared` ou
    valide no server. Nao deixe regra importante apenas no client.
13. Rode `npm run typecheck` e atualize este documento.

## Exemplo minimo

```ts
export const ORDEM_PARANORMAL_SYSTEM: CampaignSystemDefinition = {
  id: "ordemParanormal",
  dataKey: "ordemParanormal",
  name: "Ordem Paranormal",
  shortName: "Ordem",
  versionLabel: "OP",
  summary: "Atributos em pool de d20, NEX, PV, PE e Sanidade.",
  description: "Ficha base para agentes da Ordem.",
  availability: "planned",
  sheet: {
    renderer: "schema",
    schemaVersion: 1,
    dataKey: "ordemParanormal",
  },
  sheetTemplate: {
    preset: "ordemParanormal",
    systemName: "Ordem Paranormal",
    abilities: [
      { key: "agility", label: "AGI", name: "Agilidade", score: 1 },
      { key: "strength", label: "FOR", name: "Forca", score: 1 },
      { key: "intellect", label: "INT", name: "Intelecto", score: 1 },
      { key: "presence", label: "PRE", name: "Presenca", score: 1 },
      { key: "vigor", label: "VIG", name: "Vigor", score: 1 },
    ],
    proficiencyBonus: 0,
    armorClass: 10,
    speed: 9,
    hpMax: 1,
    hitDiceTotal: "",
    resources: [],
    customSections: [],
    notes: "",
  },
  sheetLayout: {
    sectionOrder: ["identity", "abilities", "skills", "resources"],
    abilityOrder: ["agility", "strength", "intellect", "presence", "vigor"],
    primaryResourceIds: [],
  },
  rules: {
    rollFormula: "atributo d20, usa o maior resultado",
    abilityScoreMode: "dice_pool",
    initiativeAbility: "agility",
    defenseLabel: "Defesa",
    hitPointMode: "current_max",
    skillMode: "ranked",
    deathSaveMode: "custom",
  },
  skills: [],
};
```

## Compatibilidade

- Campanhas antigas com `settings_json.sheetTemplate.preset = "custom"` viram
  `dnd5e`.
- `systemName` antigo nao deve ser usado como logica.
- Recursos e secoes customizadas existentes sao preservados quando possivel.
- Fichas antigas em `dataJson.dnd5e` continuam sendo lidas como fallback.

## Cuidados

- Nao reintroduzir `custom` como sistema selecionavel.
- Nao reaproveitar `dataJson.dnd5e` para sistemas novos. Use
  `dataJson[system.sheet.dataKey]`.
- So marque `availability: "available"` quando a ficha puder ser criada, aberta,
  salva e usada online sem quebrar.
- Sistemas muito diferentes devem ter renderer/adaptador proprio no client.
- Se trocar sistema em campanha existente exigir migracao profunda de dados,
  implemente no server antes de liberar o sistema.
