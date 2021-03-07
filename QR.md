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

* [body-parser](encurtador.com.br/imtCM)

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
* sequelize
* sequelize-cli
* sequelize-typescript

Segue o comando para instalar todos os pacotes:

    yarn add bcryptjs body-parser class-validator connect-redis cors dotenv express express-session helmet http-status-codes lodash passport passport-local pg pg-hstore redis reflect-metadata sequelize sequelize-cli sequelize-typescript

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



| Rota | Protocolo | Argumentos | Função | Tipo | Retorno |
|------|-----------|------------|--------|------|---------|
| users | POST | name, email e password | Cria o usuario | Pública | name, email e id |
| users | GET  | id | Obtem todas as informações do usuário | Privada | Todas informações do usuário |