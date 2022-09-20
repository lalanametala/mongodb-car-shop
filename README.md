
# Car Shop

API RESTful para uma loja de veículos. 

## Stacks utilizadas

* TypeScript
* Node.js
* Express.js
* Mongoose.js
* MongoDB
* Mocha.js
* Chai.js
* Sinon.js
* Docker
* OOP (Object-Oriented Programming)
* SOLID


## Autores

- [@lalanametala](https://www.github.com/lalanametala)


## Instalação

Para instalar e rodar o projeto é necessário ter **Git**, **Docker** e **Docker Compose** instalados em sua máquina. O Docker Compose precisa estar na versão 1.29 ou superior.

Siga as seguintes instruções:

### 1 - Clone o repositório e entre na pasta da aplicação
```sh
git clone git@github.com:lalanametala/mongodb-car-shop.git && cd mongodb-car-shop
```

### 2 - Suba os containers executando o comando abaixo na pasta raiz da aplicação
```sh
docker-compose up -d --build
```


    
## Documentação da API

A documentação do projeto pode ser acessada ao executar a aplicação e acessar o endpoint abaixo no navegador.

```http
  http://localhost:3001/doc/
```



## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test:coverage
```

