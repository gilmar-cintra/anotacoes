# Dúvidas Gerais
## Qual diferença entre NPM e Yarn ?
Basicamente são iguais, o Yarn nasceu dentro do facebook devido a frustrações pelo NPM iterar lentamente. Veja a comparação entre os dois:

    npm init | yarn init
    npm install ...| yarn add ...
    npm update ... | yarn upgrade ...
    npm remove ... | yarn remove ... 

# Backend - Passo a passo do sucesso!
```shell
├── node_modules
── config
│   └── sequelize.js
├── docker-compose.yml
├── migrations
│   └── 20210302204338-User.js
├── package.json
├── seeds
│   └── 20210302211427-Users.js
├── src
│   ├── app.ts
│   ├── auth.ts
│   ├── controllers
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── models
│   │   ├── index.ts
│   │   └── User.ts
│   ├── routes
│   │   ├── auth.ts
│   │   ├── privateRoutes.ts
│   │   ├── publicRoutes.ts
│   │   └── user.ts
│   ├── server.ts
│   └── types.ts
├── tsconfig.json
└── yarn.lock
```

## 1) Iniciando o projeto
Para o backend usaremos o NodeJS e para iniciar um novo projeto basta executar o comando a seguir denttro da pasta desejada:

      yarn init

## 2) Instalando os pacotes necessários
Antes de mais nada é importante ressalvar que existem pacotes que serão utilizados apenas no ambiente de desenvolvimento, para esses pacotes iremos instala-los da seguinte forma:

    yarn add -D <nomedopacote> 

### 2.1) Pacotes para desenvolvimento

* eslint

ESLint é uma ferramenta para identificar e relatar padrões encontrados no código ECMAScript / JavaScript.

* eslint-config-airbnb-base

Serve para que sigamos o code style guide da Airbnb, uma das empresas referencias em code style.

* eslint-plugin-import

Este plug-in traz suporte a sintaxe de importação / exportação ES2015 + (ES6 +) e evitar problemas com erros de caminhos de arquivo e nomes de importação.

* [nodemon](encurtador.com.br/uzFNQ)

Reinicia automaticamente o aplicativo (F5) quando mudanças de arquivo ou diretório são detectadas.

* ts-node

pacotes básicos para ter uma aplicação Node.js rodando com TypeScript e todas suas vantagens.

* typescript

TypeScript é uma linguagem para JavaScript em escala de aplicativo. O TypeScript adiciona tipos opcionais ao JavaScript que oferecem suporte a ferramentas para aplicativos JavaScript em grande escala para qualquer navegador, para qualquer host, em qualquer sistema operacional. O TypeScript é compilado em JavaScript legível e baseado em padrões.


Segue o comando para instalar todas essas dependencia de uma única vez:

    yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import nodemon ts-node typescript

### 2.2 ) Pacotes para produção

* bcryptjs

Usamos para criptografar senhas tanto na hora do cadastro quanto na hora de comparar se a senha digitada pelo usuário na hora de entrar no sistema é a mesma registrada no banco de dados.

* [body-parser](https://encurtador.com.br/imtCM)

Ao tentar obter informações enviadas de um formulário usando o médoto POST elas não chegam no formato JSON, o body-parser é um módulo capaz de converter o body da requisição para vários formatos. Um desses formatos é json, exatamente o que queremos.

* class-validator
* connect-redis
* cors
* dotenv

Dotenv é um módulo que carrega variáveis ​​de ambiente de um arquivo .env em process.env

* express
* express-session
* helmet
* http-status-codes
* lodash
* passport
* passport-local
* pg
* pg-hstore
* redis
* reflect-metadata


* [sequelize](https://blog.rocketseat.com.br/nodejs-express-sequelize/)
* sequelize-cli
* sequelize-typescript

O Sequelize é um ORM (Object-Relational Mapper) para Node.js, que tem suporte aos bancos de dados PostgreSQL, MariaDB, MySQL, SQLite e MSSQL, como ORM ele faz o mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos Javascript. Ele permite criar, buscar, alterar e remover dados do banco de dados utilizando métodos JS, além de permitir a modificação da estrutura das tabelas, com isso temos muita facilidade tanto na criação, população e migração de banco de dados.

Segue o comando para instalar todos os pacotes:

    yarn add bcryptjs body-parser class-validator connect-redis cors dotenv express express-session helmet http-status-codes lodash passport passport-local pg pg-hstore redis reflect-metadata sequelize sequelize-cli sequelize-typescript
    
***Obs:*** Caso for usar o banco de dados MySQL instale o adicione o pacote mysql2 
```
yarn add sequelize mysql2
```

### 2.3) Os @types dos pacotes
Em TypeScript, você pode receber vários erros sobre tipos de módulos não encontrado ou os “implíticos” any, que ele não consegue inferir o tipo. Para resolver isso podemos criar um arquivo de declarações *.d.ts ou usar o @types do pacote. 


* @types/bcryptjs
* @types/body-parser
* @types/cors
* @types/express
* @types/express-session
* @types/lodash
* @types/node
* @types/passport
* @types/passport-local
* @types/pg
* @types/redis
* @types/connect-redis
* @types/sequelize
* @types/validator
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser

Segue o comando para adicionar todos eles:

    yarn add -D @types/bcryptjs @types/body-parser @types/cors @types/express @types/express-session @types/lodash @types/node @types/passport @types/passport-local @types/pg @types/redis @types/connect-redis @types/sequelize @types/validator @typescript-eslint/eslint-plugin @typescript-eslint/parser

**Importante:** Os @types sempre devem ser adicionados em modo desenvolvimento

## 3) Configurando o package.json
Após instalado, o arquivo package.json deve ser editado e logo depois de "licence": "MIT", deve ser acrescentado:

    "scripts": {
        "build": "tsc -p .",
        "dev": "nodemon --watch src -e ts,tsx --exec ts-node -r dotenv/config src/server.ts"
    },

Esse trecho indica ao yarn que criamos um novo script chamado “dev” e quando chamado ele deve executar o nodemon a partir do arquivo principal a aplicação que neste caso é “src/server.ts”. Para executar é só usar o comando:

    yarn dev

## 4) Crie a pasta src e nela precisamos criar dois arquivos, o server.ts e o app.ts (que será importado para o server.ts)

**app.ts**

Nesse arquivo inicialmente faremos:
1) Importação do pacote express
2) Seu instanciamento 
3) A exportação do componente.

Veja como fica nosso código

    import express from 'express';

    const app = express();

    export default app;

**server.ts**

Já no server teremos os seguintes passos:
1) Importe do modulo app
3) Definição da porta que usaremos
4) Adição do bind e do listen das coneções

Ou seja

    import app from "./app";

    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

A função app.listen () é usada para realizar o bind e o listen das conexões do host em uma porta especifica.

No entanto carregar a porta manualmente não é uma boa, pois caso seja necessário sua mudança teremo um enorme trabalho, pensando nisso usaremos o pacote **Dotenv** que carrega variáveis ​​de ambiente de um arquivo .env em process.env para isso criamos um arquivo com nome .env na pasta raiz do projeto e adicionamos a porta desejada.

    PORT=3000

**Importante:** Esse arquivo deve ser adicionado ao .gitignore, já que possue informações sensiveis.

Agora podemos melhorar o nosso código

    import app from "./app";

    //É a mesma coisa que const PORT = process.env.PORT
    const { PORT = 3000 } = process.env

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

Antes de rodar o nosso código precisamos criar um arquivo tsconfig.json na pasta raiz para configuar as opções do TypeScript, basicamente ele terá o seguinte conteudo. 

**tsconfig.json**

    {
    "compilerOptions": {
        "target": "ESNEXT" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
        "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
        "lib": [
        "es6",
        "dom"
        ],
        "sourceMap": true /* Generates corresponding '.map' file. */,
        "outDir": "build" /* Redirect output structure to the directory. */,
        "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
        "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
        "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
        "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,
        /* Advanced Options */
        "resolveJsonModule": true /* Include modules imported with '.json' extension */,
        "skipLibCheck": true /* Skip type checking of declaration files. */,
        "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "config/*",
        "migrations/*",
        "seeders/*"
    ]
    }

Podemos iniciar o servidor para ver se tudo está correto

    yarn dev

Sua saída no terminal deve ser:

    Server running on port 3000

## 5) Criando algumas rotas
Chegou a hora tão esperada por todo o Brasil, a criação de rotas! No entanto iremos criar rotas de maneira em geral e depois organiza-las e otimiza-las corretamente. Abaixo segue uma imagem do banco de dados para visualizarmos as rotas necessárias:

![](https://github.com/gilmar-cintra/anotacoes/blob/fac5d1134b8180aae07f68b0f285fd1ceb60e1ec/bd.png)

**Para que serve cada tabela**
* address

Será utilizada para guardar os endereços dos usuários. 1 usuário pode ter N endereços

* field_type

O curriculo pode ter diferentes sessões (experiência profissional, educação, atividades-extracurriculares, etc) e aqui guardaremos as sessões do curriculo. Cada field pode ter 1 sessão

* field

Aqui ficará as informações especificar da sessão, por exemplo, se for uma experiencia profissiona, terá a data de inicio e fim, função, nome da empresa e descrição. 1 usuário pode e terá N fields, já que o curriculo é a composição deles.

* goal

Guardaremos aqui os objetivos do candidato, pois ele pode ter diferentes vagas compativeis (Estágio, Junior, etc) e escolher uma especifica na hora de gerar o cúrriculo. 1 usuário pode ter N 

Ex: Em busca de uma oportunidade para desenvolver e melhorar meus conhecimentos, e também algo que possa me instruir de forma crescente e contínua, visando sempre o crescimento entre mim e a empresa.

* user

Guardaremos as informações principais do usuario.

* vacancy

A vaga que o candidato deseja cadastrar, lembrando que ele pode deixar guardada várias. 1 usuário pode ter N vacancy

Ex: Programador


* language

Aqui será cadastrado globalmente as linguas que o canditado pode inserir no curriculo. 

* language_level

Nessa tabela será armazenada a expertise do candidato na ligua inserida, variando de 1 a 5 estrelas. 1 usuário pode ter N language_level

* skill

Será cadastrado as habilidades disponiveis para o candidato escolher.

Ex: HTML, CSS, JavaScript, NodeJS etc

* skill_level

Nessa tabela será armazenada a expertise do candidato na skill inserida, variando de 1 a 5 estrelas. 1 usuário pode ter N skill_level

* email_type

Aqui será armazenado o tipo de e-mail. 
Ex: Comercial, pessoal, principal, secundário, etc.

* email

Aqui será armazedo os e-mails para o curriculo. 1 usuário pode ter N e-mails

* phone_type

Aqui será cadastrado o tipo de telefone.

Ex: Comercial, residencial, celular, whatsapp etc.

* phone

Aqui será armazenado o número de telefone em si. 1 usuário pode ter N telefones.

* network_type

Aqui será cadastrado os tipos de redes sociais que poderam constar no Curriculo.

Ex: Linkein, Facebook, Twitter, Instagram etc.

* network

Aqui será armazenado o link da rede social justamente dita. 1 usuário pode ter N network.

**Para visualizar as rotas, acesse a documentação no link abaixo**

Link para a documentação

Antes de iniciarmos de fato a criação de rotas, precisamos entender como são organizadas e como elas funcionam. Vamos organizar por conceitos:

1) Podemos imaginar que o arquivo app.ts executa os "use" dos modulos sequencialmente, ou seja, se tivermos a seguintes linhas:

  app.use(publicRoutes);
  app.use(privateRoutes);

Ele usará primeiro o publicRoutes e depois o privateRoutes

2) Podemos ter roteadores dentro de roteadores para uma melhor organização (para isso o roteador principal pode usar pelo comando "use" um roteador secundário), para melhor entender o conceito, basta imaginar uma rede de computadores onde ligamos um roteador a outro roteador de acordo com seu departamento.

3) Sempre separamos as rotas entre publicas (qualquer um tem acesso) e privadas (usuários logados).

4) O nó final da rota sempre apontará para um controller.

Vamos agora criar a estutura e rotas

1) Em src crie uma pasta chamada routes

2) dentro da pasta routes crie 2 arquivo, um chamado publicRoutes.ts e outro privateRoutes.ts Ambos arquivos terão como estrutura incial o seguinte código

```
import { Router } from 'express';

const router = Router();


export default router;
```

3) Nesse exemplo trabalharemos com o user, por isso também devemos criar um arquivo chamado user.ts na mesma pasta com a rota e o encaminhamento para o seu controller

```
import { Router } from 'express';
import { PublicController, PrivateController } from '../controllers/user';

const router = {
  public: Router(),
  private: Router(),
};

router.public.post('/users', PublicController.createUser);

export default router;
```

Nesse caso temos a rota users que será direcionado para o método createUser do user controller.

4) Adicionamos a rota publica do user no publicRoutes.ts

router.use('/public', user.public);

**Adicionando LogIn e senha com Redis**

Antes de mais nada precisamos entender o fluxo tanto de login como para recuperar as informações do usuário.

Login
1) Requisição POST
2) Servidor procura pelo e-mail informado no BD (Postegress) e se não encontrar retorna um erro
3) Se encontrou o e-mail faz uma comparação entre a senha no BD (Postegress) e a senha informada criptografando-a.
4) Se forem iguais ele cria uma sessão com as informações principais (sessionId, roles, lang etc)
5) Retorna um cook para o navegador com a sessão

Recuperando um dado
1) Faz a requisição POST ou GET
2) Lê o sessionID no cook do navegador e recupera as informações da sessão no DB (Redis)
3) Verifica sem está autorizado e se tem os devidos privilégios
4) Se tiver, usa as informações da sessão para recuperar o dado solicitado no DB.

Agora que já sabemos a lógica básica, vamos iniciar o nosso banco de dados, para isso é só adicionar os seguinte código ao arquvio docker-compose.yml

```
  projeto_redis:
    image: redis:alpine
    command: redis-server --requirepass 12345678
    restart: always
    ports:
      - 6380:6379
    volumes:
      - "projeto_redis_data:/var/lib/redis"
```
Não esqueça de colocar o volume que armazenará os dados

```
  projeto_redis_data:
```
Agora é só adicionar as informações para conexão no arquivo .env

```
REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_PASSWORD=12345678
SESS_SECRET_OLD=a-vida-eh-bela-como-um-gato-na-janela
SESS_SECRET_NEW=olha-o-preco-da-casa
SESS_LIFETIME=7200000
SESS_NAME=sid
```

### 5.1) Usando migrations com o Sequelize para manipular o banco de dados

1) Inicie o sequelize usando 

    yarn sequelize init

Esse processo deve criar alguns arquivos no projeto, como a pasta config, migrations, models e seeders.

2) Renomei o config/config.json para config/sequelize.js

Ele terá as configurações do banco de dados, que na verdade deve vir de forma geral do .env veja o exemplo a seguir:

```
require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    repositoryMode: true,
  },
};
```
3) Crie o arquivo .sequelizerc na raiz do backend com o seguinte código

```
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'sequelize.js'),
  'migrations-path': path.resolve('migrations'),
  'seeders-path': path.resolve('seeds'),
  'models-path': path.resolve('models'),
}

```
4) No pasta src > models > index.ts situado lembresse de registrar todos os modelos e configurar mais ou menos assim
```
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import sequelizeConfig from '../../config/sequelize';
import { Pergunta } from './Pergunta';

const { NODE_ENV } = process.env;

// Pega as opções de config/sequelize.js
const sequelizeOptions: SequelizeOptions = sequelizeConfig[NODE_ENV];
const sequelize = new Sequelize(sequelizeOptions);

// Adiciona array com todos os nossos models
sequelize.addModels([
Pergunta,
]);

// Testa a conexão tentando se autenticar
sequelize.authenticate()
  .then(() => {
    if (NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.log('Sequelize: Conexão com MySQL estabelecida com sucesso.');
    }
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Sequelize: Não foi possível conectar-se com o postgres - ', err);
  });

export default sequelize;
```

**Importante:** Você pode criar o banco de dados (nesse exemplo postgres) por meio de um container, para isso basta criar um arquivo chamado docker-composer.yml na raiz do projeto com o seguinte conteudo:

```
version: "3.1"
services:
  nomedoprojeto_db:
    image: postgres:11.5-alpine
    restart: always
    environment:
      POSTGRES_USER: gilmarcintra
      POSTGRES_PASSWORD: 12345678
      POSTGRES_DB: nomedoprojeto
    volumes:
      - "resume_db_data:/var/lib/postgresql/data"
  nomedoprojeto_adminer:
    image: adminer
    restart: always
    depends_on:
      - resume_db
    ports:
      - 8081:8080
volumes:
  nomedoprojeto_db_data:

```

Após sua criação é só executar o comando para rodar em background:

    docker-compose up -d

Lembre-se de pausar outros containers que tiverem usando a mesma porta.

Para criar os modelos, podemos iniciar usando o CLI do Sequelize. Veja um exemplo

    node_modules/.bin/sequelize model:generate --name users --attributes name:string,password:string,email:string,created:Date,updated:Date,active:boolean

ou

    yarn sequelize migration:generate --name create-fields
    
Isso gerará o modelo na pasta model (que não iremos usar, pois definiremos manualmente um .ts) e o arquivo de migração em migrations. Ele já gerará o campo id com autoincremento, o createdAt e o updatedAt.

```
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file         [sinônimos: migration:create]
  sequelize model:generate                    Generates a model and its migration        [sinônimos: model:create]
  sequelize seed:generate                     Generates a new seed file                   [sinônimos: seed:create]

```

### 5.2) Definindo modelos e estabelecendo relações

Chegou a hora de definir nossos modelos, para isso na pasta src crie uma pasta chamada models e crie o modelo conforme o exemplo de Field.ts

```
/* eslint-disable camelcase */
import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  NotEmpty,
  BelongsTo,
} from "sequelize-typescript";
import { FieldType } from "./FieldType";
import { User } from "./User";

@Table({ tableName: "fields" })
export class Field extends Model<Field> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  fieldTypeId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  title: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  entity: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  startDate: Date;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  endDate: Date | null;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  description: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

}
```

Não é necessário criar o campo id, já que ele é extendido da classe Model.

**Estabelecendo relações no modelos **
Perceba que em nosso modelo existem dois campos (userId e fieldTypeId) que são referencias para outra tabela. Por conta disso devemos fazer essa referencia dizendo ao modelo que esses campos "pertencem" a outra tabela.

```
  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => FieldType, "fieldTypeId")
  fieldType?: FieldType;
```
Já no modelo da tabela "dona" desse atributo (FieldType), devemos indicar esse relacionamento colocando

```
  @HasMany(() => Field, "fieldTypeId")
  fields?: Field[];
```
Já no migration da tabela que conterá a chave estrangeira devemos informar esse(s) relacionamento(s), geralmente fazemos isso após a definição do Id.

```
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      fieldTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'fields_types',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
```
Para exetucar um migration é só utilizar o comando
  
  yarn sequelize db:migrate

## 5.3) Gerando seeders

Podemos gerar algumas inserções de teste para nosso banco de dados, para isso basta usar o comando 

  yarn sequelize seed:generate --name demo-fields_types

Isso gerará um diretório chamado seeders (caso não exista) e um arquivo XXXXXXXX-demo-fields_types.js agora é só editar o seu conteúdo. Veja o exemplo a seguir:

```
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fields_types',
      [{
        type: 'Formação',
        created: new Date(),
        updated: new Date()
      },
      {
        type: 'Experiências',
        created: new Date(),
        updated: new Date()
      }, {
        type: 'Extracurriculares',
        created: new Date(),
        updated: new Date()
      }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('fields_types', null, {});
  }
};

```
Depois é só executar o comando 

  yarn sequelize db:seed:all

E como mágica o banco de dados estará povoado. Caso precise apenas fazer o seed de uma tabela, basta usar o comando

  yarn sequelize db:seed --seed [seed file name]

**Importante** Caso use o campo password, lembre de usar password: bcrypt.hashSync("minhasenha", bcrypt.genSaltSync(10)),

## 6) Gerando a documentação

Para isso usaremos o Swagger por meio de sua biblioteca

* swagger-ui-express

Vamos instala-las por meio do comando:

    yarn add swagger-ui-express

    yarn add -D @types/swagger-ui-express

Agora criamos um arquivo de configuração chamado swagger.json na pasta raiz do projeto, ele terá toda a configuração e conteúdo de nossa documentação e inicialmente será o seguinte conteúdo.

```
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Currículo Fácil",
    "description": "Essa é a documentação da API do sistema Currículo Fácil",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "host": "localhost:5000",
  "basePath": "",
  "tags": [
    {
      "name": "Users",
      "description": "Caminhos para manipulação de usuários"
    }
  ],
  "schemes": "http",
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ]
}
```

Agora é simples, basta importa-lo a biblioteca, o arquivo de configuração e definir a rota da documentação no arquivo server.ts

```
import app from "./app";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'

const { PORT = 5000 } = process.env;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

Para uma referencia completa de como usar o Swagger basta visitar https://swagger.io/docs/specification/about/

**Importante:** Note que pode existir dois tipos de descrição para a documentação o modelo openapi ou swagger, então preste atenção no começo da descrição do modelo.


