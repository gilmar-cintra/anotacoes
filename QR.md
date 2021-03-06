# Dúvidas Gerais
## Qual diferença entre NPM e Yarn ?
Basicamente são iguais, o Yarn nasceu dentro do facebook devido a frustrações pelo NPM iterar lentamente. Veja a comparação entre os dois:

    npm init | yarn init
    npm install ...| yarn add ...
    npm update ... | yarn upgrade ...
    npm remove ... | yarn remove ... 

# Backend
## Como inicio um projeto para o backend?
Para o backend usaremos o NodeJS e para iniciar um novo projeto basta executar o comando a seguir denttro da pasta desejada:

      yarn init

## Quais são os pacotes necessários para o trabalho e quais são suas funções?
Antes de mais nada é importante ressalvar que existem pacotes que serão utilizados apenas no ambiente de desenvolvimento, para esses pacotes iremos instala-los da seguinte forma:

    yarn add -D <nomedopacote> 

### Pacotes para desenvolvimento

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

### Pacotes para produção

* bcryptjs
* body-parser
* class-validator
* connect-redis
* cors
* dotenv
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

### Os @types dos pacotes
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
