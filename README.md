# PokeDS — Projeto Individual

Aplicação web educativa em Node.js/Express que simula uma interface estilo "Nintendo DS" para um quiz e dashboard inspirado no universo Pokémon. O projeto serve páginas estáticas (HTML/CSS/JS) e provê rotas para quiz, perfil e gerenciamento de usuários conectando-se a um banco MySQL.

## Funcionalidades
- Interface interativa em uma tela que lembra um console portátil (HTML/CSS/JS)
- Quiz com respostas (páginas e lógica no frontend em public/JS)
- Páginas de perfil, dicas e dashboard com gráficos (usa Chart.js)
- API básica em Express com rotas para usuários, perfil e quiz
- Conexão com banco MySQL (scripts para criação de tabelas em src/database)

## Tecnologias
- Node.js
- MySQL
- Chart.js
- Frontend: HTML, CSS, JavaScript

## Pré-requisitos
- Node.js (v16+ recomendado)
- npm
- MySQL Server (local ou remoto)

## Instalação
1. Clone o repositório
2. Acesse a pasta do site e instale dependências:

```bash
cd site
npm install
```

## Configuração (variáveis de ambiente)
O app carrega variáveis de ambiente usando dotenv a partir de `.env` (ambiente de produção) ou `.env.dev` (desenvolvimento). O arquivo usado é definido em `app.js` pela variável `ambiente_processo` (comente/descomente as linhas no topo de `app.js` para alternar) ou definindo as variáveis desejadas nos arquivos `.env`/`.env.dev`.

Crie um arquivo `.env.dev` (ou `.env`) com as seguintes chaves mínimas:

```
APP_PORT=3000
APP_HOST=localhost
AMBIENTE_PROCESSO=desenvolvimento

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

## Banco de dados
O script para criar as tabelas está em `site/src/database/script-tabelas.sql`. Crie o banco (ou ajuste `DB_DATABASE`) e rode o script no seu servidor MySQL:

```sql
CREATE DATABASE nome_do_banco;
USE nome_do_banco;
```

## Como executar
Na pasta `site`:

```bash
# Ambiente de desenvolvimento
npm run dev

# Produção
npm start
```

A aplicação servirá os arquivos estáticos a partir da pasta `site/public`. Após iniciar, acesse: http://<APP_HOST>:<APP_PORT>

## Rotas principais
- GET/POST /usuarios — endpoints relacionados a usuários (em src/routes/usuarios.js)
- /quiz — endpoints do quiz (src/routes/quiz.js)
- /perfil — rotas de perfil (src/routes/perfilroute.js)
- / — rota principal (src/routes/index.js)

Observação: as rotas são implementadas no diretório `site/src/routes` e chamam os controllers em `site/src/controllers`.

## Estrutura do projeto (resumo)
- site/
  - app.js — servidor Express
  - package.json
  - .env, .env.dev — exemplos/variantes de configuração
  - public/ — HTML, CSS, JS e assets (ícones e imagens)
  - src/
    - controllers/ — lógica das rotas
    - models/ — modelos que chamam `src/database/config.js`
    - routes/ — definição de rotas
    - database/ — script-tabelas.sql e config.js

## Testes e desenvolvimento
- Não há testes automatizados incluídos. Para desenvolvimento, use `npm run dev`.

## Contribuição
- Abra uma issue ou envie um pull request. Mantenha mudanças pequenas e documentadas.

## Licença
Este projeto utiliza a licença MIT (veja `site/LICENSE`).

## Contato / Créditos
Feito pelos desenvolvedores @ São Paulo Tech School / Bandtec Digital School (informação presente em `site/package.json`).