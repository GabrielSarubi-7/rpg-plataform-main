# Como Rodar o Projeto

Este guia mostra o caminho para rodar o projeto localmente em modo de desenvolvimento.

## Requisitos

- Node.js 22 ou superior.
- npm.
- PostgreSQL rodando localmente ou em um servidor acessivel.
- Git.
- Opcional: `cloudflared` para testes online via Cloudflare Tunnel.

## 1. Instalar dependencias

Na raiz do projeto:

```bash
npm install
```

## 2. Configurar o banco

Crie um banco PostgreSQL para o projeto. Exemplo de nome:

```txt
rpg_platform
```

Voce pode criar pelo pgAdmin, DBeaver ou terminal do PostgreSQL.

## 3. Configurar variaveis de ambiente

### Server

Crie ou ajuste o arquivo:

```txt
apps/server/.env
```

Exemplo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/rpg_platform"
JWT_SECRET="troque-por-uma-chave-grande-e-secreta"
CLIENT_ORIGIN="http://localhost:5173"
PORT=3001
```

Variaveis opcionais:

```env
ASSET_STORAGE_DIR="C:/Users/Gabriel/Desktop/rpg-plataform/uploads/assets"
ASSET_UPLOAD_LIMIT="24mb"
JSON_BODY_LIMIT="6mb"
SOCKET_MAX_BUFFER_BYTES=6291456
```

Se `ASSET_STORAGE_DIR` nao for definido, o servidor usa `apps/server/uploads/assets` relativo ao processo do server.

Resumo:

- `DATABASE_URL`: conexao PostgreSQL usada pelo Prisma.
- `JWT_SECRET`: segredo para assinar tokens de login.
- `CLIENT_ORIGIN`: origem liberada no CORS e Socket.IO.
- `PORT`: porta HTTP do server.
- `ASSET_STORAGE_DIR`: pasta fisica para imagens e audios enviados.
- `ASSET_UPLOAD_LIMIT`: limite do upload bruto em `/assets`.
- `JSON_BODY_LIMIT`: limite para payload JSON das rotas HTTP.
- `SOCKET_MAX_BUFFER_BYTES`: limite de payload pelo Socket.IO.

### Client

Crie ou ajuste o arquivo:

```txt
apps/client/.env
```

Exemplo:

```env
VITE_SERVER_URL="http://localhost:3001"
```

Se `VITE_SERVER_URL` estiver vazio em desenvolvimento local, o Vite usa proxy
para `/auth`, `/campaigns`, `/assets`, `/health` e `/socket.io`.

Em teste online, `VITE_SERVER_URL` precisa apontar para uma URL publica do
server. Se ficar como `http://localhost:3001`, o computador de outro player vai
tentar acessar o backend no localhost dele.

## 4. Rodar migrations do Prisma

Na raiz do projeto:

```bash
npx prisma migrate dev --schema apps/server/prisma/schema.prisma
```

Se precisar apenas gerar o Prisma Client:

```bash
npx prisma generate --schema apps/server/prisma/schema.prisma
```

## 5. Rodar o projeto em desenvolvimento

Para subir client e server juntos:

```bash
npm run dev
```

URLs padrao:

```txt
Client: http://localhost:5173
Server: http://localhost:3001
```

Tambem da para rodar separado:

```bash
npm run dev:client
npm run dev:server
```

## 6. Validar o projeto

Typecheck completo:

```bash
npm run typecheck
```

Build completo:

```bash
npm run build
```

Build separado:

```bash
npm run build:client
npm run build:server
```

## 7. Migrar assets antigos em base64

Se o banco tiver imagens antigas salvas como `data:image/...;base64`, rode:

```bash
npm run migrate:assets -w server
```

Esse comando procura imagens/audios antigos em base64 no banco, salva como arquivos reais em `uploads/assets` e troca o campo pesado por uma URL como:

```txt
/assets/hash-do-arquivo.webp
```

Os players continuam acessando normalmente pelo servidor.

## 8. Rodar para teste online

Para testar com outra pessoa fora da rede local, o client e o server precisam estar acessiveis publicamente.

Fluxo simples com Cloudflare Tunnel:

```bash
cloudflared tunnel --url http://localhost:5173
```

Para multiplayer funcionar fora da sua maquina, o frontend tambem precisa apontar para uma URL publica do backend em `VITE_SERVER_URL`.

Exemplo:

```env
VITE_SERVER_URL="https://sua-url-publica-do-server"
```

Se expor apenas o client e deixar `VITE_SERVER_URL=http://localhost:3001`, o computador do seu amigo vai tentar acessar o backend no `localhost` dele, nao no seu.

## 9. Estrutura rapida

```txt
apps/client  - React, Vite, UI do jogo, mapa, fichas, chat e sockets
apps/server  - Express, Socket.IO, Prisma, auth, campanhas e persistencia
shared       - tipos e regras compartilhadas entre client e server
docs         - documentacao do projeto
```

## 10. Funcionalidades principais para testar

- Criar conta, logar e criar campanha.
- Escolher sistema no catalogo de sistemas. Hoje apenas `dnd5e` aparece.
- Entrar por convite com outro usuario.
- Criar fichas, categorias e subcategorias.
- Marcar ficha ativa e usar a barra de acoes.
- Criar tokens no mapa e testar permissao GM/player.
- Alterar mapa/fog/camadas e conferir sincronizacao online.
- Rolar dados, rolagem secreta do GM e iniciativa.
- Iniciar fila de turnos e passar turno.
- Enviar imagem/audio para assets e confirmar que outro player consegue ver/ouvir.
- Usar fila de audio com YouTube ou MP3.

## Problemas comuns

### Failed to fetch

Verifique:

- server esta rodando em `http://localhost:3001`;
- `apps/client/.env` tem `VITE_SERVER_URL` correto;
- `CLIENT_ORIGIN` no server permite o client atual;
- se estiver usando tunnel, o client aponta para a URL publica do server.

### Erro de banco

Verifique:

- PostgreSQL esta rodando;
- `DATABASE_URL` esta correta;
- o banco existe;
- migrations foram aplicadas.

### Porta ocupada

Portas padrao:

```txt
5173 - client Vite
3001 - server Express/Socket.IO
```

Se precisar trocar a porta do server, altere `PORT` em `apps/server/.env` e atualize `VITE_SERVER_URL` no client.

### Imagens nao aparecem para outros players

Verifique:

- a imagem foi enviada como asset, nao como caminho local do seu computador;
- o servidor esta servindo `/assets/...`;
- o outro player acessa a mesma API configurada em `VITE_SERVER_URL`.
