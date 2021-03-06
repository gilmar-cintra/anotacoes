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

* nodemon

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
**Os @types sempre devem ser adicionados em modo desenvolvimento**

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

Agora podemos melhorar o nosso código

    import app from "./app";

    //É a mesma coisa que const PORT = process.env.PORT
    const { PORT = 3000 } = process.env

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });


Agora melhoraremos o app.ts