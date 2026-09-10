# RPG Platform

RPG Platform e uma mesa virtual de RPG. O projeto tem mapa online, fichas,
tokens, turnos, chat, rolagens, audio, assets persistidos e base inicial para
suportar multiplos sistemas de RPG.

## Stack

Monorepo npm com workspaces:

- `apps/client`: React 18, Vite, TypeScript, Zustand e Socket.IO Client.
- `apps/server`: Node.js, Express 5, Socket.IO, Prisma 7 e PostgreSQL.
- `shared`: tipos e regras TypeScript compartilhadas entre client e server.

## Dependencias

Obrigatorias:

- Node.js 22 ou superior.
- npm.
- PostgreSQL.
- Git.

Dependencias principais do projeto:

- Root/dev: `concurrently`, `typescript`.
- Client: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`,
  `socket.io-client`, `zustand`.
- Server: `express`, `socket.io`, `prisma`, `@prisma/client`,
  `@prisma/adapter-pg`, `pg`, `dotenv`, `cors`, `jsonwebtoken`, `bcryptjs`,
  `tsx`.

Opcional para teste online:

- Cloudflare Tunnel (`cloudflared`) ou outro tunel/reverse proxy.

## Funcionalidades atuais

- Login, cadastro e sessao autenticada por JWT.
- Criacao, entrada e gerenciamento de campanhas.
- Convites de mesa e manejo de membros, incluindo cargo GM/player.
- Catalogo de sistemas de RPG. Hoje apenas `dnd5e` esta disponivel; legado
  `custom` e convertido para `dnd5e`.
- Modelo de ficha editavel pelo GM para novas fichas.
- Biblioteca de fichas com categorias e subcategorias.
- Permissoes de ficha, fichas publicas e agrupamento por player.
- Mapa 2D com grid, fog, imagens de mapa/camadas, tokens e assets persistidos.
- Tokens com tamanho variavel, barras, status, efeitos e validacao GM/player.
- Barra de acoes, recursos, custos, descansos e uso de habilidades.
- Alvos e areas de efeito sincronizados online.
- Efeitos ativos por turno e suporte a invocacao via acao.
- Fila de turnos, iniciativa e passar turno.
- Chat, rolagens normais, rolagens secretas do GM, critico/falha critica.
- Anotacoes/desenho no mapa sincronizados.
- Audio de mesa com YouTube/MP3, fila, volume e player global.
- Upload de imagens/audio via `/assets` e migracao de base64 antigo.

## Instalacao

```bash
git clone https://github.com/GabrielSarubi-7/rpg-plataform.git
cd rpg-plataform
npm install
```

## Variaveis de ambiente

### Server

Crie `apps/server/.env`:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/rpg_platform"
JWT_SECRET="troque-por-uma-chave-grande-e-secreta"
CLIENT_ORIGIN="http://localhost:5173"
PORT=3001
```

Opcionais:

```env
ASSET_STORAGE_DIR="C:/caminho/para/uploads/assets"
ASSET_UPLOAD_LIMIT="24mb"
JSON_BODY_LIMIT="6mb"
SOCKET_MAX_BUFFER_BYTES=6291456
```

### Client

Crie `apps/client/.env` se precisar apontar para um backend especifico:

```env
VITE_SERVER_URL="http://localhost:3001"
```

Em desenvolvimento local, se `VITE_SERVER_URL` ficar vazio, o Vite usa proxy
para `/auth`, `/campaigns`, `/assets`, `/health` e `/socket.io`.

## Banco de dados

Crie o banco PostgreSQL e rode as migrations:

```bash
npx prisma migrate dev --schema apps/server/prisma/schema.prisma
```

Para apenas gerar o Prisma Client:

```bash
npx prisma generate --schema apps/server/prisma/schema.prisma
```

## Rodando

Client e server juntos:

```bash
npm run dev
```

Separado:

```bash
npm run dev:client
npm run dev:server
```

URLs padrao:

- Client: `http://localhost:5173`
- Server: `http://localhost:3001`
- Healthcheck: `http://localhost:3001/health`

## Validacao

```bash
npm run typecheck
npm run build
```

Builds separados:

```bash
npm run build:client
npm run build:server
```

## Assets antigos em base64

Se o banco tiver imagens antigas salvas como base64, rode:

```bash
npm run migrate:assets -w server
```

O script salva os arquivos em `ASSET_STORAGE_DIR` ou `uploads/assets` e troca o
JSON pesado por URLs `/assets/...`.

## Documentacao

- [Como rodar](docs/COMO_RODAR.md)
- [Guia do projeto](docs/PROJECT_GUIDE.md)
- [Sistemas de RPG](docs/SISTEMAS.md)

## Observacoes para desenvolvimento

- Nao editar arquivos gerados em `apps/server/src/generated/prisma`.
- Regras compartilhadas devem ficar em `shared/rules` ou `shared/types`.
- Permissao GM/player deve ser validada no server, nao apenas no client.
- Evite persistir base64 grande em JSON; use o fluxo de assets.
- Ao criar evento online, atualize tipos em `shared`, service/socket no client e
  handler no server.
