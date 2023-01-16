## Contexto

O objetivo do projeto foi construir uma **API REST** simples que simule um sistema de carteira digital. A API permite cadastrar clientes e suas contas com um valor de balanço inicial, assim como realizar tranferências de valores entre contas e consultar balanço e transações realizadas quando o cliente estiver devidamente autenticado. A API usa como persistência um banco de dados **MySQL**, funcionando via docker-compose.

## Tecnologias usadas
* Docker;
* Node.js;
* Nest.js;
* Typescript;
* JWT(JSON Web Token);
* MySQL;
* Prisma(ORM);
* Jest;



## Instalando Dependências

Clone o repositório:
```bash
git clone git@github.com:caiquequaresmasilva/nestjs-transference-api.git
``` 

Entre na pasta do repositório clonado e instale as dependências:

```bash
cd nestjs-transference-api
npm install
``` 

## Executando a aplicação

Para rodar a API, é necessário configurar as variáveis de ambiente no arquivo `.env`

```
PORT=3000 # Porta de comunicação da API
DB_PORT=3306 # Porta de comunicação do Banco de dados
DB_NAME=transference-api # Nome do Banco de dados
DB_USER=root # Usuário de acesso ao banco de dados
DB_PASSWORD=dbPassword # Senha do usuário
DB_HOST=dbHost # Host do banco de dados

TOKEN_SECRET=tokenSecret #Chave para autenticação de usuário do JWT
``` 
---

Feitas as devidas configurações, rode a aplicação com o docker-compose usando o script:
```bash
npm run compose:up
``` 

Para encerrar o docker-compose:
```bash
npm run compose:down
``` 

Para rodar o app localmente, tenha um banco de dados MySQL configurado. Os seguintes scripts podem ser usados:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Com a API rodando, acesse sua documentação no endpoint `/doc`.

## Executando Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

