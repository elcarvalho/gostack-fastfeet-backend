# Fastfeet - API

API desenvolvida em javascript com intuito de atender as aplicações web e mobile
de uma transportadora fictícia (Fastfeet).

**as instuções a seguir assumem que você já tenha o [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) e o [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) instalados em seu ambiente de desenvolvimento**

# Como utilizar este projeto

## Baixe o projeto
```
# Você pode clonar este repositório a partir de seu terminal executando:

> git clone https://github.com/elcarvalho/gostack-fastfeet-backend.git
```

## Configure um banco de dados
```
O arquivo src/config/database.js possui as configurações de conexão com o banco de dados, fique à vontade para adicionas suas configurações.
```

## Aplicando as migrations
```
# Execute a partir da raiz do projeto o comando abaixo para aplicar as migrations e configurar o banco de dados da aplicação

> yarn sequelize db:migrate
```

## Baixe as dependências
```
# Dentro do repositório clonado execute o comando abaixo para baixar as depedências:

> yarn install
```

## Inicie a API em desenvolvimento
```
# Com as dependências baixadas você pode iniciar a API em modo de desenvolvimento executando:

> yarn dev
```
